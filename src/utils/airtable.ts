import settings from "../../USER_CONFIG/settings.json"

export type Company = {
  name: string;
  description: string;
  website: string;
  amountRaising: string;
  fund: string;
  status: string;
  statusChris: string;
  recordUrl: string;
  deck: string;
  lastStatusChange: string | null;
};

const myHeaders = new Headers();
myHeaders.append(
  "Authorization",
  `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}`
);
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", "brw=brwy1TrDiZyNAsU5u");

export const searchForBusiness = async (name: string) => {
  //   console.log("search function called for", name);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  const res = await fetch(
    `https://api.airtable.com/v0/${settings.app_id}/Pipeline?filterByFormula=SEARCH("${name.toLowerCase()}", lower({Company}))`,
    requestOptions
  );
  //   console.log("res", res);
  const data = await res.json();
  //   console.log("data", data);

  const formattedData = data.records.map((company: Company) => {
    return formatBusiness(company);
  });

  if (data.records.length < 1) {
    return { status: "no results", companies: [] };
  }
  return { status: "success", companies: formattedData as Company[] };
};

const formatBusiness = (rawBusiness: any) => {
  const fields = rawBusiness.fields;
  return {
    name: fields["Company"],
    description: fields["Description"],
    website: fields["Website (for extension)"],
    amountRaising: fields["Amount Raising"],
    fund: fields["Fund"],
    status: fields["Status"],
    recordUrl: `${settings.root_url_for_record_url}${rawBusiness["id"]}?blocks=hide`,
    deck: fields["Link to Deck"],
    lastStatusChange: fields["Last Status Change"].error
      ? null
      : fields["Last Status Change"],
  } as Company;
};


// --------
// --------
// --------
// triage section

export type TriageCompany = {
  name: string;
  amountRaising: number;
  website: string;
  deck: string;
  dateAdded: string;
  isFirstRound: boolean;
  problem: string;
  description: string;
  id: string;
  recordURL: string;
};

const fetchAirtable = async (userEmail: string) => {
  // console.log(userEmail);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const AIRTABLE_URL = `https://api.airtable.com/v0/${settings.app_id}/Pipeline?view=${encodeURI(
    "(Quick Triage API 2023)"
  )}&maxRecords=1&filterByFormula=${encodeURI(
    `SEARCH("${userEmail}",{Triage Emails Joined})=0`
  )}`;
  // console.log(AIRTABLE_URL);

  // AIRTABLE_URL = urlWithoutSort;
  const res = await fetch(AIRTABLE_URL, requestOptions as RequestInit);
  // console.log(res);
  const data = await res.json();
  return data;
};

export const fetchDF = async (userEmail: string) => {
  const data = await fetchAirtable(userEmail);
  //   return data;

  const structuredData = data.records.map((company: any): TriageCompany => {
    return {
      name: company.fields.Company,
      amountRaising: company.fields["Amount Raising"],
      website: company.fields["Website (for extension)"],
      deck: company.fields["Link to Deck"],
      dateAdded: company.fields["Date Added"],
      isFirstRound: company.fields["First Round?"],
      problem: company.fields["Problem in Focus"],
      description: company.fields["Description"],
      id: company.id,
      recordURL: `${settings.root_url_for_record_url}${company.id}?blocks=hide`,
    };
  });
  return structuredData as Company[];
};

const patchAirtable = async (
  companyId: string,
  verdict: string,
  userId: string,
  comment: string
) => {
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    body: JSON.stringify({
      records: [
        {
          fields: {
            Status: verdict,
            Person: [userId],
            Company: [companyId],
            Comments: comment,
          },
        },
      ],
    }),
  };
  const AIRTABLE_URL =
    `https://api.airtable.com/v0/${settings.app_id}/Triage%20Thoughts`;

  const res = await fetch(AIRTABLE_URL, requestOptions as RequestInit);

  const data = await res.json();
  return data;
};

export const voteOnBusiness = async (
  userEmail: string,
  companyId: string,
  verdict: string,
  comment: string
) => {
  // console.log(userEmail, companyId, verdict);

  // POST Request to airtabl
  return await patchAirtable(companyId, verdict, userEmail, comment);
};

export const getTeamRecordId = async (email: string) => {
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const AIRTABLE_URL = `https://api.airtable.com/v0/${settings.app_id}/Fund%20Team?view=${encodeURI(
    "teamAPI"
  )}&maxRecords=1&filterByFormula=${encodeURI(`{Email}="${email}"`)}`;
  // console.log(AIRTABLE_URL);

  // AIRTABLE_URL = urlWithoutSort;
  const res = await fetch(AIRTABLE_URL, requestOptions as RequestInit);
  // console.log("user search response -> ", res);
  const data = await res.json();
  return data.records[0].id;
};
