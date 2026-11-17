import { publicProcedure, router } from "../_core/trpc";
import { getPaymentRailSnapshot } from "../commerce/paymentRailSnapshot";

/**
 * Public, read-only payment-route discovery.
 * No payment intent, checkout session, wallet signature, transfer, trade,
 * custody, refund, or payout is created by this router.
 */
export const paymentRailsRouter = router({
  getOptions: publicProcedure.query(() => getPaymentRailSnapshot()),
});
