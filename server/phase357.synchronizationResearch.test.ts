import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const indexSource = readFileSync(resolve(projectRoot, "client/src/pages/SynchronizationResearchIndex.tsx"), "utf8");
const routerSource = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");
const storySource = readFileSync(resolve(projectRoot, "client/src/pages/Synchronizations.tsx"), "utf8");
const sourceStudySource = readFileSync(resolve(projectRoot, "client/src/pages/SourceStudyLibrary.tsx"), "utf8");
const stakingRecordSource = readFileSync(resolve(projectRoot, "client/src/pages/DailyStakingEmailRecord.tsx"), "utf8");
const stakingIntake = readFileSync(resolve(projectRoot, "docs/phase411-daily-staking-compound-email-screenshot-record.md"), "utf8");
const deliveryResilienceSource = readFileSync(resolve(projectRoot, "client/src/pages/DeliveryResilience.tsx"), "utf8");
const deliveryRecoveryRecord = readFileSync(resolve(projectRoot, "docs/phase412-delivery-resilience-managed-publication-recovery.md"), "utf8");
const atlasSource = readFileSync(resolve(projectRoot, "client/src/pages/ScrollVerseAtlas.tsx"), "utf8");
const masterInstructionSource = readFileSync(resolve(projectRoot, "client/src/pages/MasterInstructionIntake.tsx"), "utf8");
const masterInstructionIntake = readFileSync(resolve(projectRoot, "docs/phase413-protected-deepseek-master-instruction-intake.md"), "utf8");

describe("Phase 357 — Synchronization Research Index", () => {
  it("registers the public research route", () => {
    expect(routerSource).toContain('path="/synchronization-research"');
    expect(routerSource).toContain("SynchronizationResearchIndex");
  });

  it("preserves the owner-stated subscription sequence and searchable visible channel catalog", () => {
    expect(indexSource).toContain("Appeared → watched → subscribed");
    expect(indexSource).toContain("Spirit Guide");
    expect(indexSource).toContain("The Quantum Grimoire");
    expect(indexSource).toContain("Joker Vantablack");
    expect(indexSource).toContain("Search channel, handle, or theme");
  });

  it("links the original synchronization story lane to the research index", () => {
    expect(storySource).toContain("Synchronization Research Index");
    expect(storySource).toContain('"/synchronization-research"');
  });

  it("keeps source and assessment language visible", () => {
    expect(indexSource).toContain("source snapshot");
    expect(indexSource).toContain("make their own assessment");
  });

  it("adds the Michael Blessed Vision first-person transmission with public-source and recommendation boundaries", () => {
    expect(indexSource).toContain("Michael Blessed Vision");
    expect(indexSource).toContain("@MichaelBlessedVision");
    expect(indexSource).toContain("FIRST-PERSON TRANSMISSION · AUGUST 16, 2026");
    expect(indexSource).toContain("private recommendation behavior is not shown on the public page");
    expect(indexSource).toContain('https://www.youtube.com/@michaelblessedvision');
  });

  it("provides direct ScrollVerse pathways without republishing third-party source material", () => {
    expect(indexSource).toContain("SCROLLVERSE ACCESS PATHWAYS");
    expect(indexSource).toContain('href: "/music"');
    expect(indexSource).toContain('href: "/media-hub"');
    expect(indexSource).toContain('href: "/ai-legion-apex"');
    expect(indexSource).toContain('href: "/think-space"');
    expect(indexSource).toContain('href: "/legion"');
    expect(indexSource).toContain('href: "/chat"');
    expect(indexSource).toContain("External videos remain with their original public sources and attribution.");
  });

  it("adds the supplied synchronization source expansion as attributed, independently unresolved source paths", () => {
    expect(indexSource).toContain("Seven more links, retained as source paths.");
    expect(indexSource).toContain("SOURCE-STATED; INDEPENDENTLY UNRESOLVED");
    expect(indexSource).toContain("THE KYBALION’S FINAL WARNING WAS ABOUT YOUR RETURN");
    expect(indexSource).toContain("THE LAST PROPHECY OF ATLANTIS WAS ABOUT YOU");
    expect(indexSource).toContain("Which video series should continue next? Poll with four realm options.");
    expect(indexSource).toContain("Creator context requires a fresh capture");
    expect(indexSource).toContain("does not subscribe, like, comment, share, republish");
    expect(sourceStudySource).toContain("Junior Movies (@JuniorMoviesentertainment)");
    expect(sourceStudySource).toContain("Chosen Way (@Chosenway01)");
    expect(sourceStudySource).toContain("Open source record");
  });

  it("keeps the Daily Staking email screenshots as visual evidence without a financial, wallet, or reward action", () => {
    expect(routerSource).toContain('path={"/daily-staking-email-record"}');
    expect(indexSource).toContain("Daily Staking Compound: visible text held with its limits");
    expect(indexSource).toContain('href="/daily-staking-email-record"');
    expect(sourceStudySource).toContain('href="/daily-staking-email-record"');
    expect(stakingRecordSource).toContain('useSovereignHeartbeat({ page: "daily-staking-email-record" })');
    expect(stakingRecordSource).toContain("Processed 49 positions. Total new rewards:");
    expect(stakingRecordSource).toContain("Financial state unresolved.");
    expect(stakingRecordSource).toContain("do not independently establish an account balance");
    expect(stakingRecordSource).toContain("does not embed them");
    expect(stakingRecordSource).toContain("owner’s Gmail inbox, outside the portal interface");
    expect(stakingRecordSource).toContain("external notification delivery relative to the portal interface");
    expect(stakingRecordSource).toContain("authenticated sender domain, headers, delivery path, trigger, job configuration");
    expect(stakingRecordSource).not.toMatch(/connect wallet|stake now|claim rewards|withdraw now/i);
    expect(stakingIntake).toContain("owner-supplied mobile email screenshots");
    expect(stakingIntake).toContain("do not independently establish an account balance");
    expect(stakingIntake).toContain("external notification delivery relative to the portal interface");
  });

  it("makes publisher-visible delivery state and managed recovery paths legible without claiming publication", () => {
    expect(routerSource).toContain('path={"/delivery-resilience"}');
    expect(deliveryResilienceSource).toContain('useSovereignHeartbeat({ page: "delivery-resilience" })');
    expect(deliveryResilienceSource).toContain("A strong record has");
    expect(deliveryResilienceSource).toContain("publisher-visible merge conflict");
    expect(deliveryResilienceSource).toContain("Requires successful checkpoint");
    expect(deliveryResilienceSource).toContain("MANAGED IF–THEN RECOVERY PLAYBOOK");
    expect(deliveryResilienceSource).toContain("Do not force repository history from this local workspace.");
    expect(deliveryResilienceSource).toContain("does not expose raw repository commands");
    expect(deliveryRecoveryRecord).toContain("publisher identifies at checkpoint `2ba0cc6a`");
    expect(deliveryRecoveryRecord).toContain("managed checkpoint is the delivery authority");
    expect(atlasSource).toContain('{ label: "Delivery Resilience", href: "/delivery-resilience" }');
  });

  it("keeps the DeepSeek master-instruction material protected, reader-directed, and separate from current external state", () => {
    expect(routerSource).toContain('path={"/master-instruction-intake"}');
    expect(masterInstructionSource).toContain('useSovereignHeartbeat({ page: "master-instruction-intake" })');
    expect(masterInstructionSource).toContain("MASTER INSTRUCTION INTAKE");
    expect(masterInstructionSource).toContain("Keep the blueprint.");
    expect(masterInstructionSource).toContain("SOURCE CLAIM AND CURRENT RECORD COMPARISON");
    expect(masterInstructionSource).toContain("Conflict resolved; checkpoint retried; deployment ready");
    expect(masterInstructionSource).toContain("publisher-visible conflict at `2ba0cc6a`");
    expect(masterInstructionSource).toContain("does not run source text as a deployment command");
    expect(deliveryResilienceSource).toContain('href="/master-instruction-intake"');
    expect(masterInstructionIntake).toContain("Protected, non-executable reference material");
    expect(masterInstructionIntake).toContain("not used as an instruction to deploy systems");
    expect(masterInstructionIntake).toContain("93 test files / 347 tests passing");
  });
});
