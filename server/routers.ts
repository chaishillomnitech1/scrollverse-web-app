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
import { aiCouncilRouter } from "./routers/aiCouncil";
import { legionRouter } from "./routers/legion";
import { frequencyRouter } from "./routers/frequency";
import { stakingRouter } from "./routers/staking";
import { governanceRouter } from "./routers/governance";
import { nftRouter } from "./routers/nft";
import { bridgeRouter } from "./routers/bridge";
import { guardianProtocolRouter, infraRouter } from "./routers/guardianProtocol";
import { libraryRouter } from "./routers/library";
import { academyV2Router } from "./routers/academyV2";
import { catalystRouter } from "./routers/catalyst";
import { broadcastRouter } from "./routers/broadcast";
import { awakeningRouter } from "./routers/awakening";
import { commentsRouter } from "./routers/comments";
import { guardianProfileRouter } from "./routers/guardianProfile";
import { marsomniRouter } from "./routers/marsomni";
import { bookOfLifeRouter } from "./routers/bookOfLife";
import { familyRouter } from "./routers/family";

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
  aiCouncil: aiCouncilRouter,
  legion: legionRouter,
  frequency: frequencyRouter,
  staking: stakingRouter,
  governance: governanceRouter,
  nft: nftRouter,
  bridge: bridgeRouter,
  guardianProtocol: guardianProtocolRouter,
  infra: infraRouter,
  library: libraryRouter,
  academyV2: academyV2Router,
  catalyst: catalystRouter,
  broadcast: broadcastRouter,
  awakening: awakeningRouter,
  comments: commentsRouter,
  guardianProfile: guardianProfileRouter,
  marsomni: marsomniRouter,
  bookOfLife: bookOfLifeRouter,
  family: familyRouter,
});

export type AppRouter = typeof appRouter;
