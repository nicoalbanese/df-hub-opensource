import { z } from "zod";
import {
  fetchDF,
  getTeamRecordId,
  voteOnBusiness,
} from "../../../utils/airtable";

import { router, publicProcedure } from "../trpc";

export const triageRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const currentUser = await ctx.prisma.user.findUnique({
      where: { email: ctx.session?.user?.email as string },
    });

    const companies = await fetchDF(currentUser?.email as string);
    // console.log(companies);

    return { message: "success", companies };
  }),
  sendOpinion: publicProcedure
    .input(
      z.object({
        companyId: z.string(),
        verdict: z.string(),
        comment: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // console.log(input);
      const currentUser = await ctx.prisma.user.findUnique({
        where: { email: ctx.session?.user?.email as string },
      });

      if (currentUser?.airtableRecordId) {
        const res = await voteOnBusiness(
          currentUser?.airtableRecordId as string,
          input.companyId,
          input.verdict,
          input.comment
        );
        return { res };
      } else {
        const userId = await getTeamRecordId(currentUser?.email as string);
        await ctx.prisma.user.update({
          where: { email: ctx.session?.user?.email as string },
          data: { airtableRecordId: userId },
        });
        const res = await voteOnBusiness(
          currentUser?.airtableRecordId as string,
          input.companyId,
          input.verdict,
          input.comment
        );
        return { res };
      }
      // console.log(res);
      // return { res };
    }),
});
