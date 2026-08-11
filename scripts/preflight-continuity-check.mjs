import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const ledgerPath = resolve(root, "docs", "CONTINUITY_LEDGER.md");
const phaseLedgerPath = resolve(root, "docs", "phase98-fashion-continuity-ledger.md");
const requiredPhrases = [
  "Original concept separation",
  "Evidence-driven activation",
  "Provider safety",
  "Secret safety",
];

function assertFile(path, label) {
  if (!existsSync(path)) throw new Error(`${label} is missing: ${path}`);
}

function main() {
  assertFile(ledgerPath, "Continuity ledger");
  assertFile(phaseLedgerPath, "Phase 98 ledger");
  const ledger = readFileSync(ledgerPath, "utf8");
  const missing = requiredPhrases.filter(phrase => !ledger.includes(phrase));
  if (missing.length) throw new Error(`Continuity ledger is incomplete: ${missing.join(", ")}`);

  console.log("CONTINUITY_LEDGER_PRESENT=true");
  console.log("COMMERCE_MODE=FAIL_CLOSED_DOCUMENTATION_ONLY");
  console.log("CHECK_RESULT=PASS");
  console.log("NOTE=This check does not call providers, write data, process payments, or activate commerce.");
}

main();
