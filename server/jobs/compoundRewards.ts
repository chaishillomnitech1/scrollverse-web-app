/**
 * Compound Rewards Heartbeat Job
 * Runs daily to calculate and record estimated rewards in the application database.
 * This is off-chain ledger accounting; it does not transfer tokens or call a staking contract.
 *
 * Formula: dailyRate = apyRate / 365 / 100
 * newRewards = (chxStaked + rewardsEarned) * dailyRate
 * rewardsEarned += newRewards
 *
 * Also fires in-app notifications when off-chain ledger estimates are updated.
 */
import { getDb } from "../db";
import { stakingPositions, notifications } from "../../drizzle/schema";
import { eq, and } from "drizzle-orm";

export async function compoundStakingRewards(): Promise<{
  processed: number;
  totalNewRewards: number;
  errors: string[];
  executionMode: "off_chain_ledger";
}> {
  const db = await getDb();
  const errors: string[] = [];
  let processed = 0;
  let totalNewRewards = 0;

  // Get all active staking positions
  const activePositions = await db
    .select()
    .from(stakingPositions)
    .where(eq(stakingPositions.status, "active"));

  for (const position of activePositions) {
    try {
      const staked = parseFloat(position.chxStaked) || 0;
      const earned = parseFloat(position.rewardsEarned ?? "0") || 0;
      const apyRate = parseFloat(position.apyRate) || 0;

      if (staked <= 0 || apyRate <= 0) continue;

      // Daily compounding: APY / 365
      const dailyRate = apyRate / 365 / 100;
      const principal = staked + earned;
      const newRewards = principal * dailyRate;
      const updatedRewards = earned + newRewards;

      await db
        .update(stakingPositions)
        .set({
          rewardsEarned: updatedRewards.toFixed(6),
          lastCompoundAt: new Date(),
        })
        .where(eq(stakingPositions.id, position.id));

      // Fire in-app notification to the staker
      const poolLabel =
        position.pool === "genesis"
          ? "Genesis (432%)"
          : position.pool === "celestial"
            ? "Celestial (528%)"
            : "Infinity (999%)";

      await db.insert(notifications).values({
        userId: position.userId,
        title: "⚡ Staking Ledger Updated",
        message: `Your ${poolLabel} pool position recorded an estimated +${newRewards.toFixed(4)} CHX in the off-chain application ledger. Ledger total: ${updatedRewards.toFixed(4)} CHX. No token transfer or on-chain staking transaction was performed.`,
        type: "staking",
        link: "/staking",
      });

      processed++;
      totalNewRewards += newRewards;
    } catch (err) {
      errors.push(`Position ${position.id}: ${String(err)}`);
    }
  }

  return { processed, totalNewRewards, errors, executionMode: "off_chain_ledger" };
}
