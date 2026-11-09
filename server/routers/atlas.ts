import { and, desc, eq, like, or } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { atlasEntities, atlasRelationships } from "../../drizzle/schema";
import { getDb } from "../db";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { traverseAtlasGraph } from "../atlas/graph";

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Atlas publishing and registry changes require administrator access." });
  }
  return next({ ctx });
});

async function requireDb() {
  const db = await getDb();
  if (!db) {
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Atlas Core storage is unavailable. Apply the reviewed Atlas migration before enabling these routes." });
  }
  return db;
}

const publicEntityFilter = and(
  eq(atlasEntities.status, "PUBLISHED"),
  eq(atlasEntities.visibility, "PUBLIC"),
);
const publicRelationshipFilter = and(
  eq(atlasRelationships.status, "PUBLISHED"),
  eq(atlasRelationships.visibility, "PUBLIC"),
);

async function loadPublicGraph() {
  const db = await requireDb();
  const [entities, relationships] = await Promise.all([
    db.select().from(atlasEntities).where(publicEntityFilter).orderBy(desc(atlasEntities.updatedAt)).limit(500),
    db.select().from(atlasRelationships).where(publicRelationshipFilter).orderBy(desc(atlasRelationships.updatedAt)).limit(2000),
  ]);
  return {
    nodes: entities.map(entity => ({
      id: entity.id,
      slug: entity.slug,
      title: entity.title,
      kind: entity.kind,
    })),
    edges: relationships.map(edge => ({
      id: edge.id,
      sourceEntityId: edge.sourceEntityId,
      targetEntityId: edge.targetEntityId,
      relationType: edge.relationType,
    })),
  };
}

export const atlasRouter = router({
  listEntities: publicProcedure
    .input(z.object({
      kind: z.enum(["PROJECT", "REPOSITORY", "CONVERSATION", "ARTIFACT", "DISCOVERY", "PERSON", "PLATFORM", "CONCEPT", "DEPLOYMENT"]).optional(),
      limit: z.number().int().min(1).max(100).default(24),
      offset: z.number().int().min(0).default(0),
    }))
    .query(async ({ input }) => {
      const db = await requireDb();
      const filter = input.kind
        ? and(publicEntityFilter, eq(atlasEntities.kind, input.kind))
        : publicEntityFilter;
      return db.select({
        id: atlasEntities.id,
        slug: atlasEntities.slug,
        title: atlasEntities.title,
        kind: atlasEntities.kind,
        summary: atlasEntities.summary,
        provenance: atlasEntities.provenance,
        sourceLabel: atlasEntities.sourceLabel,
        sourceUrl: atlasEntities.sourceUrl,
        updatedAt: atlasEntities.updatedAt,
      }).from(atlasEntities).where(filter)
        .orderBy(desc(atlasEntities.updatedAt))
        .limit(input.limit)
        .offset(input.offset);
    }),

  search: publicProcedure
    .input(z.object({ query: z.string().trim().min(1).max(120), limit: z.number().int().min(1).max(50).default(20) }))
    .query(async ({ input }) => {
      const db = await requireDb();
      const pattern = `%${input.query}%`;
      return db.select({
        id: atlasEntities.id,
        slug: atlasEntities.slug,
        title: atlasEntities.title,
        kind: atlasEntities.kind,
        summary: atlasEntities.summary,
        provenance: atlasEntities.provenance,
        sourceLabel: atlasEntities.sourceLabel,
      }).from(atlasEntities)
        .where(and(
          publicEntityFilter,
          or(
            like(atlasEntities.title, pattern),
            like(atlasEntities.slug, pattern),
            like(atlasEntities.summary, pattern),
          ),
        ))
        .orderBy(desc(atlasEntities.updatedAt))
        .limit(input.limit);
    }),

  getLineage: publicProcedure
    .input(z.object({
      slug: z.string().min(1).max(160),
      direction: z.enum(["outgoing", "incoming", "both"]).default("both"),
      maxDepth: z.number().int().min(0).max(5).default(2),
    }))
    .query(async ({ input }) => {
      const graph = await loadPublicGraph();
      const result = traverseAtlasGraph(graph.nodes, graph.edges, input.slug, {
        direction: input.direction,
        maxDepth: input.maxDepth,
      });
      if (!result) {
        throw new TRPCError({ code: "NOT_FOUND", message: "No published public Atlas entity matches that slug." });
      }
      return result;
    }),

  createEntity: adminProcedure
    .input(z.object({
      slug: z.string().trim().min(2).max(160).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a lowercase URL-safe slug."),
      title: z.string().trim().min(2).max(240),
      kind: z.enum(["PROJECT", "REPOSITORY", "CONVERSATION", "ARTIFACT", "DISCOVERY", "PERSON", "PLATFORM", "CONCEPT", "DEPLOYMENT"]),
      summary: z.string().max(4000).optional(),
      sourceLabel: z.string().trim().max(255).optional(),
      sourceUrl: z.string().url().max(1024).optional(),
      sourceEvidenceId: z.number().int().positive().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await requireDb();
      const [existing] = await db.select({ id: atlasEntities.id }).from(atlasEntities)
        .where(eq(atlasEntities.slug, input.slug)).limit(1);
      if (existing) throw new TRPCError({ code: "CONFLICT", message: "An Atlas entity with this slug already exists." });

      const [inserted] = await db.insert(atlasEntities).values({
        slug: input.slug,
        title: input.title,
        kind: input.kind,
        summary: input.summary ?? null,
        sourceLabel: input.sourceLabel ?? null,
        sourceUrl: input.sourceUrl ?? null,
        sourceEvidenceId: input.sourceEvidenceId ?? null,
        provenance: input.sourceEvidenceId ? "SOURCE_LINKED" : "OWNER_REPORTED",
        status: "DRAFT",
        visibility: "PRIVATE",
        createdByUserId: ctx.user.id,
      });
      return { success: true, id: Number((inserted as { insertId?: number }).insertId ?? 0), status: "DRAFT" as const };
    }),

  publishEntity: adminProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ input }) => {
      const db = await requireDb();
      const [existing] = await db.select({ id: atlasEntities.id }).from(atlasEntities)
        .where(eq(atlasEntities.id, input.id)).limit(1);
      if (!existing) throw new TRPCError({ code: "NOT_FOUND", message: "Atlas entity not found." });
      await db.update(atlasEntities).set({ status: "PUBLISHED", visibility: "PUBLIC" })
        .where(eq(atlasEntities.id, input.id));
      return { success: true, id: input.id, status: "PUBLISHED" as const };
    }),

  createRelationship: adminProcedure
    .input(z.object({
      sourceEntityId: z.number().int().positive(),
      targetEntityId: z.number().int().positive(),
      relationType: z.string().trim().min(2).max(96).regex(/^[A-Z][A-Z0-9_]*$/, "Use an uppercase relationship code."),
      description: z.string().max(2000).optional(),
      sourceLabel: z.string().trim().max(255).optional(),
      sourceUrl: z.string().url().max(1024).optional(),
      sourceEvidenceId: z.number().int().positive().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (input.sourceEntityId === input.targetEntityId) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Self-referential Atlas relationships are not allowed in this release." });
      }
      const db = await requireDb();
      const endpointRows = await db.select({ id: atlasEntities.id }).from(atlasEntities)
        .where(or(eq(atlasEntities.id, input.sourceEntityId), eq(atlasEntities.id, input.targetEntityId)));
      if (endpointRows.length !== 2) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Both relationship endpoints must exist before an edge can be created." });
      }
      const [duplicate] = await db.select({ id: atlasRelationships.id }).from(atlasRelationships)
        .where(and(
          eq(atlasRelationships.sourceEntityId, input.sourceEntityId),
          eq(atlasRelationships.targetEntityId, input.targetEntityId),
          eq(atlasRelationships.relationType, input.relationType),
        )).limit(1);
      if (duplicate) throw new TRPCError({ code: "CONFLICT", message: "This directed relationship already exists." });

      const [inserted] = await db.insert(atlasRelationships).values({
        sourceEntityId: input.sourceEntityId,
        targetEntityId: input.targetEntityId,
        relationType: input.relationType,
        description: input.description ?? null,
        sourceLabel: input.sourceLabel ?? null,
        sourceUrl: input.sourceUrl ?? null,
        sourceEvidenceId: input.sourceEvidenceId ?? null,
        provenance: input.sourceEvidenceId ? "SOURCE_LINKED" : "OWNER_REPORTED",
        status: "DRAFT",
        visibility: "PRIVATE",
        createdByUserId: ctx.user.id,
      });
      return { success: true, id: Number((inserted as { insertId?: number }).insertId ?? 0), status: "DRAFT" as const };
    }),

  publishRelationship: adminProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ input }) => {
      const db = await requireDb();
      const [relationship] = await db.select().from(atlasRelationships)
        .where(eq(atlasRelationships.id, input.id)).limit(1);
      if (!relationship) throw new TRPCError({ code: "NOT_FOUND", message: "Atlas relationship not found." });

      const endpoints = await db.select({ id: atlasEntities.id, status: atlasEntities.status, visibility: atlasEntities.visibility })
        .from(atlasEntities)
        .where(or(
          eq(atlasEntities.id, relationship.sourceEntityId),
          eq(atlasEntities.id, relationship.targetEntityId),
        ));
      if (endpoints.length !== 2 || endpoints.some(entity => entity.status !== "PUBLISHED" || entity.visibility !== "PUBLIC")) {
        throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Publish both endpoint entities before publishing their relationship." });
      }

      await db.update(atlasRelationships).set({ status: "PUBLISHED", visibility: "PUBLIC" })
        .where(eq(atlasRelationships.id, input.id));
      return { success: true, id: input.id, status: "PUBLISHED" as const };
    }),
});
