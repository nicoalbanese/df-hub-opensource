import { router } from "../trpc";
import { authRouter } from "./auth";
import { dealflowRouter } from "./dealflow";
import { triageRouter } from "./triage";

export const appRouter = router({
  dealflow: dealflowRouter,
  auth: authRouter,
  triage: triageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
