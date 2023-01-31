// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";


const API_KEY = process.env.NEXT_PUBLIC_COMPANIES_HOUSE_KEY;
const COMPANY_API_URL =
  "https://api.company-information.service.gov.uk/company/";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { companyNumber } = req.query;

  const fRes = await fetch(COMPANY_API_URL + companyNumber, {
    method: "GET",
    // mode: "no-cors",
    headers: {
      Authorization: `Basic ${Buffer.from(API_KEY as string).toString("base64")}`,
      // "X-Auth-Token": `${API_KEY}`,
      // "Accept": "application/json",
    },
  });
  const data = await fRes.json();
  const officers = await fetch(COMPANY_API_URL + companyNumber + "/officers", {
    method: "GET",
    // mode: "no-cors",
    headers: {
      Authorization: `Basic ${Buffer.from(API_KEY as string).toString("base64")}`,
      // "X-Auth-Token": `${API_KEY}`,
      // "Accept": "application/json",
    },
  });
  const officerData = await officers.json();

  res.status(200).json({ ...data, officerData });
}
