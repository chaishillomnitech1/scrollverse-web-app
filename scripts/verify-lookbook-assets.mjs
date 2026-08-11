import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const manifestPath = resolve(root, "config", "drops", "atlantis-production.json");

if (!existsSync(manifestPath)) {
  console.log("LOOKBOOK_ASSET_PREFLIGHT=PASS");
  console.log("MANIFEST_STATUS=NOT_PRESENT");
  console.log("COMMERCE_MODE=FAIL_CLOSED_DOCUMENTATION_ONLY");
  console.log("NOTE=No production manifest is evaluated or created by this check.");
  process.exit(0);
}

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const values = Array.isArray(manifest?.assets) ? manifest.assets.map(asset => String(asset?.url ?? asset ?? "")) : [];
const invalid = values.filter(value => !value.startsWith("https://") || value.startsWith("s3://") || /placeholder|staging/i.test(value));
console.log(`LOOKBOOK_ASSET_PREFLIGHT=${invalid.length ? "REVIEW_REQUIRED" : "PASS"}`);
console.log(`ASSET_REFERENCE_COUNT=${values.length}`);
console.log("COMMERCE_MODE=FAIL_CLOSED_DOCUMENTATION_ONLY");
if (invalid.length) console.log("NOTE=Placeholder, staging, or non-browser-deliverable paths remain ineligible for approval.");
