/**
 * Massive.com File Storage tRPC Router
 * Upload, list, get presigned URLs, and delete files in the sovereign storage vault.
 */
import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { massivePut, massiveGet, massiveDelete, massiveList } from "../massiveStorage";

export const massiveRouter = router({
  /**
   * Upload a file (base64-encoded) to Massive.com storage
   */
  uploadFile: protectedProcedure
    .input(
      z.object({
        key: z.string().min(1).max(512),
        data: z.string(), // base64-encoded file content
        contentType: z.string().default("application/octet-stream"),
        fileName: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const buffer = Buffer.from(input.data, "base64");
      const result = await massivePut(input.key, buffer, input.contentType);
      return { key: result.key, url: result.url, fileName: input.fileName };
    }),

  /**
   * Get a presigned download URL for a file
   */
  getFileUrl: protectedProcedure
    .input(z.object({ key: z.string().min(1), expiresIn: z.number().default(3600) }))
    .mutation(async ({ input }) => {
      const result = await massiveGet(input.key, input.expiresIn);
      return { key: result.key, url: result.url };
    }),

  /**
   * Delete a file from storage
   */
  deleteFile: protectedProcedure
    .input(z.object({ key: z.string().min(1) }))
    .mutation(async ({ input }) => {
      await massiveDelete(input.key);
      return { success: true };
    }),

  /**
   * List files in the vault with optional prefix filter
   */
  listFiles: protectedProcedure
    .input(z.object({ prefix: z.string().default(""), maxKeys: z.number().default(100) }))
    .query(async ({ input }) => {
      const files = await massiveList(input.prefix, input.maxKeys);
      return { files };
    }),
});
