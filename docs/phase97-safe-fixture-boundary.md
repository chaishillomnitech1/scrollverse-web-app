# Phase 97 Safe Fixture and Activation Boundary

The supplied deployment sequence references Prisma and a direct activation endpoint. This project uses Drizzle with tRPC, and its active architecture intentionally does not expose a public or secret-header activation route. No Prisma migration, no `prisma/seed-*` command, and no `POST /api/atlantis/activate` endpoint was added.

| Requested behavior | Safe implementation | Reason |
|---|---|---|
| Seed seven SKUs and twenty-one image URLs | `server/fixtures/atlantisIncomplete.fixture.ts` | The fixture is test-only, uses intentionally invalid URLs, and never writes to the production database. |
| Prove incomplete data fails | `server/atlantisCatalog.test.ts` | The regression test asserts that missing authorization, zero pricing, unapproved assets, and missing evidence keep the gate locked. |
| Activate commerce by request header | Not implemented | Activation remains server-evaluated and administrative. A header secret alone is not sufficient evidence of merchant authorization, pricing, policies, or supplier agreements. |
| Generate visual material | Concept-only lookbook mockups | Generated visuals will be labeled for review and will not set an asset record to approved. |

> A record becomes eligible for commerce only after the protected catalog operations terminal contains independently reviewable agreement and sample evidence, approved SKU economics, three approved images for each SKU, approved impact-recipient terms, customer policy links, and authorized Shopify configuration.

Browser verification on the local development environment confirmed that `/mein` renders all seven gallery entries under **“CONCEPT REVIEW GALLERY”**, repeats the **“CONCEPT — NOT APPROVED FOR SALE”** label, and retains the existing independent approved-product-image requirement in the technical-pack area. The gallery does not write to catalog asset records and does not activate checkout.
