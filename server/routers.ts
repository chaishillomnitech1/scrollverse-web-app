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
import { crmRouter } from "./routers/crm";
import { creatorRouter } from "./routers/creator";
import { aiHubRouter } from "./routers/aiHub";
import { revenueRouter } from "./routers/revenue";
import { kycRouter } from "./routers/kyc";
import { exchangeRouter } from "./routers/exchange";
import { knowledgeRouter } from "./routers/knowledge";
import { legionRewardsRouter } from "./routers/legionRewards";
import { partnersRouter } from "./routers/partners";
import { uapRouter } from "./routers/uap";
import { globalDashboardRouter } from "./routers/globalDashboard";
import { synterRouter } from "./routers/synter";
import { massiveRouter } from "./routers/massive";
import { casinoRouter } from "./routers/casino";
import { notificationsRouter } from "./routers/notifications";
import { chxRouter } from "./routers/chx";
import { knickRouter } from "./routers/knick";
import { aiLegionRouter } from "./routers/aiLegion";
import { aiTwinRouter } from "./routers/aiTwin";
import { aiTwinSessionsRouter } from "./routers/aiTwinSessions";
import { zernioRouter } from "./routers/zernio";
import { chessRouter } from "./routers/chessRouter";
import { analyticsRouter } from "./routers/analytics";
import { thinkSpaceRouter } from './routers/thinkSpace';
import { saferwayRouter } from "./routers/saferway";
import { metricsRouter } from "./routers/metrics";
import { seerahRouter } from "./routers/seerah";
import { booksRouter } from "./routers/books";
import { cardRouter } from "./routers/card";

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
  crm: crmRouter,
  creator: creatorRouter,
  aiHub: aiHubRouter,
  revenue: revenueRouter,
  kyc: kycRouter,
  exchange: exchangeRouter,
  knowledge: knowledgeRouter,
  legionRewards: legionRewardsRouter,
  partners: partnersRouter,
  uap: uapRouter,
  globalDashboard: globalDashboardRouter,
  synter: synterRouter,
  massive: massiveRouter,
  casino: casinoRouter,
  notifications: notificationsRouter,
  chx: chxRouter,
  knick: knickRouter,
  aiLegion: aiLegionRouter,
  aiTwin: aiTwinRouter,
  aiTwinSessions: aiTwinSessionsRouter,
  zernio: zernioRouter,
  chess: chessRouter,
  analytics: analyticsRouter,
  saferway: saferwayRouter,
  thinkSpace: thinkSpaceRouter,
  metrics: metricsRouter,
  seerah: seerahRouter,
  books: booksRouter,
  card: cardRouter,
});

export type AppRouter = typeof appRouter;
