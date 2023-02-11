import { router } from "../trpc";
import { authRouter } from "./auth";
import { dealflowRouter } from "./dealflow";
import { triageRouter } from "./triage";
import { adminRouter } from "./admin";

export const appRouter = router({
  dealflow: dealflowRouter,
  auth: authRouter,
  triage: triageRouter,
  admin: adminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
