import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { guardianRouter } from "./routers/guardian";
import { stripeRouter } from "./routers/stripe";
import { academyRouter } from "./routers/academy";
import { chatRouter } from "./routers/chat";
import { annoOmniRouter } from "./routers/annoOmni";
import { referralRouter } from "./routers/referral";
import { merchantRouter } from "./routers/merchant";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  guardian: guardianRouter,
  store: stripeRouter,
  academy: academyRouter,
  chat: chatRouter,
  annoOmni: annoOmniRouter,
  referral: referralRouter,
  merchant: merchantRouter,
});

export type AppRouter = typeof appRouter;
