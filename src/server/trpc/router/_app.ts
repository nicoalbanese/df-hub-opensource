import { router } from "../trpc";
import { authRouter } from "./auth";
import { dealflowRouter } from "./dealflow";

export const appRouter = router({
  dealflow: dealflowRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
