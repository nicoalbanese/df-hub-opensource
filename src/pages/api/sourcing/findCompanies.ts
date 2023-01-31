// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   name: string;
// };

const API_KEY = process.env.NEXT_PUBLIC_COMPANIES_HOUSE_KEY;
// const COMPANY_API_URL =
//   "https://api.company-information.service.gov.uk/company/09362605/officers";

const API_URL =
  "https://api.company-information.service.gov.uk/advanced-search/companies?";

export const SIC_CODES_GENERALIST = [
  "62012", // Business and domestic software development
  "62090", // Other information technology service activities
  "58290", // Other software publishing
  "62011", // Ready-made interactive leisure and entertainment software development
];

export const SIC_CODES_LIFE_SCIENCE = [
  "72110", // - Research and experimental development on biotechnology
  "72190", // - Other research and experimental development on natural sciences and engineering
  "74909", // - Other professional, scientific and technical activities not elsewhere classified
];


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { date, fund } = req.query;
  console.log(fund);

  let SIC_CODES: string[] = [];
  if (fund === "generalist") {
    SIC_CODES = SIC_CODES_GENERALIST;
  } else if (fund === "life") {
    SIC_CODES = SIC_CODES_LIFE_SCIENCE
  } else {
    console.error("SIC CODES ERROR")
  }


  const DATE_SEARCH_PARAMS = {
    incorporated_from: date as string,
    sic_codes: SIC_CODES.join(", "),
    incorporated_to: date as string,
    company_type: "ltd",
    company_name_excludes:
      "consultancy, consulting, marketing, services, systems, agency, productions, consultants, studio, specialists, special, advisor, advisors, advice, protection, software, solutions, associates, investments, marketing, counsulting, group, development, service, resource",
    size: "300",
    company_status: "active",
  };

  const fRes = await fetch(API_URL + new URLSearchParams(DATE_SEARCH_PARAMS), {
    method: "GET",
    // mode: "no-cors",
    headers: {
      Authorization: `Basic ${Buffer.from(API_KEY as string).toString("base64")}`,
      // "X-Auth-Token": `${API_KEY}`,
      // "Accept": "application/json",
    },
  });
  const data = await fRes.json();

  const companies = data.items;
  const newCompanies = companies.filter(
    (company: any) => company.company_name.split(" ").length < 4
  );
  console.log("old filter -> ", companies.length, " results");
  console.log("new filter -> ", newCompanies.length, " results");

  data.items = newCompanies;

  res.status(200).json({ ...data });
}
