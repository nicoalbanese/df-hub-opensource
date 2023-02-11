import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const adminRouter = router({
  getUsers: protectedProcedure.query(async ({ ctx }) => {
    const currentUser = await ctx.prisma.user.findUnique({
      where: { email: ctx.session?.user?.email as string },
    });
    if (currentUser?.admin) {
      const users = await ctx.prisma.user.findMany({
        // select: { approved: true, name: true, email: true },
      });
      return users;
    }
    return [];
  }),
  updateApprovalStatus: protectedProcedure
    .input(z.object({ id: z.string(), newApprovalStatus: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      const updatedUser = await ctx.prisma.user.update({
        where: { id: input.id },
        data: { approved: input.newApprovalStatus },
      });
      return updatedUser;
    }),
});
