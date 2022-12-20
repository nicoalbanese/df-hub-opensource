import { z } from "zod";
import { searchForBusiness } from "../../../utils/airtable";

import { router, publicProcedure } from "../trpc";

export const dealflowRouter = router({
  searchForCompany: publicProcedure
    .input(z.object({ companyName: z.string() }))
    .query(async ({ input }) => {
      const companies = await searchForBusiness(input.companyName);
      return {
        companies
      };
    }),
});
