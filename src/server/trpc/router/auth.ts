import { router, publicProcedure, protectedProcedure } from "../trpc";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getAuthStatus: protectedProcedure.query(async ({ ctx }) => {
    const currentUser = await ctx.prisma.user.findUnique({
      where: { email: ctx.session?.user?.email as string },
    });

    const userAuthStatus = {
      authorised: false,
      admin: false,
    };
    if (currentUser?.approved) {
      userAuthStatus.authorised = true;
    } else {
      userAuthStatus.authorised = false;
    }
    if (currentUser?.admin) {
      userAuthStatus.admin = true;
    } else {
      userAuthStatus.admin = false;
    }

    return userAuthStatus;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
