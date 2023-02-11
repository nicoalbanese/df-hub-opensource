import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  fetchDF,
  getTeamRecordId,
  voteOnBusiness,
} from "../../../utils/airtable";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const triageRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const currentUser = await ctx.prisma.user.findUnique({
      where: { email: ctx.session?.user?.email as string },
    });

    if (currentUser?.approved) {
      const companies = await fetchDF(currentUser?.email as string);
      return { message: "success", companies };
    } else {
      return {message: "unauthorised", companies: []}
    }
    // console.log(companies);

    // return { message: "success", companies };
  }),
  sendOpinion: protectedProcedure
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
        console.log(currentUser.airtableRecordId);
        const res = await voteOnBusiness(
          currentUser?.airtableRecordId as string,
          input.companyId,
          input.verdict,
          input.comment
        );
        return { res };
      } else {
        const userId = await getTeamRecordId(currentUser?.email as string);
        console.log(userId);
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
