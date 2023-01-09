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
    `https://api.airtable.com/v0/apptcOM65nkIWJy1l/Pipeline?filterByFormula=SEARCH("${name.toLowerCase()}", lower({Company}))`,
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
    statusChris: fields["Status (Chris)"],
    recordUrl: `https://airtable.com/apptcOM65nkIWJy1l/tblltzjPiwy7gOkKE/viwg63PSZQ8mWWeID/${rawBusiness["id"]}?blocks=hide`,
    deck: fields["Link to Deck"],
    lastStatusChange: fields["Last Status Change"].error
      ? null
      : fields["Last Status Change"],
  } as Company;
};

// for score sheet

// var myHeaders = new Headers();
// myHeaders.append("Authorization", `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}`);
// myHeaders.append("Content-Type", "application/json");
// myHeaders.append("Cookie", "brw=brwy1TrDiZyNAsU5u");

// export const searchForBusinessScoreSheet = async (name: string) => {
//   console.log("search function called for", name);

//   const requestOptions = {
//     method: "GET",
//     headers: myHeaders,
//     redirect: "follow",
//   };

//   const res = await fetch(
//     `https://api.airtable.com/v0/apptcOM65nkIWJy1l/Pipeline?filterByFormula=SEARCH("${name.toLowerCase()}", lower({Company}))`,
//     requestOptions
//   );
//   console.log("res", res);
//   const data = await res.json();
//   console.log("data", data);

//   const formattedData = data.records.map((company) => {
//     return formatBusinessScoreSheet(company);
//   });

//   if (data.records.length < 1) {
//     return "No businesses found...";
//   }
//   return formattedData;
// };

// const formatBusinessScoreSheet = (rawBusiness) => {
//   const fields = rawBusiness.fields;
//   return {
//     name: fields["Company"],
//     description: fields["Description"],
//     website: fields["Website (for extension)"],
//     recordUrl: `https://airtable.com/apptcOM65nkIWJy1l/tblltzjPiwy7gOkKE/viwg63PSZQ8mWWeID/${rawBusiness["id"]}?blocks=hide`,
//     id: rawBusiness["id"],
//     lastStatusChange: fields["Last Status Change"].error
//       ? null
//       : fields["Last Status Change"],
//   };
// };

// export const addToAirtable = async (newScore) => {
//   console.log(newScore);

//   const formatted = {};
//   newScore.formattedQuestions.map((question) => {
//     formatted[question.question] = question.answer;
//   });

//   const raw = JSON.stringify({
//     records: [
//       {
//         fields: {
//           Company: [newScore.company.id],
//           Scorer: [newScore.reviewer],
//           ...formatted,
//         },
//       },
//     ],
//   });

//   console.log(raw);

//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow",
//   };
//   const res = await fetch(
//     "https://api.airtable.com/v0/apptcOM65nkIWJy1l/Investment%20Score",
//     requestOptions
//   );
//   const data = await res.json();
//   console.log(data.records[0].id);
//   return `https://airtable.com/apptcOM65nkIWJy1l/tblmFxez5F4AWTX9d/viw6VQRU96eMe8arK/${data.records[0].id}?blocks=hide`;
// };

// export const getTeam = async (name) => {
//   console.log("search function called for", name);

//   const requestOptions = {
//     method: "GET",
//     headers: myHeaders,
//     redirect: "follow",
//   };

//   const res = await fetch(
//     `https://api.airtable.com/v0/apptcOM65nkIWJy1l/Ascension%20Team`,
//     requestOptions
//   );
//   console.log("res", res);
//   const data = await res.json();
//   console.log("data", data);

//   const formattedData = data.records.map((company) => {
//     return formatName(company);
//   });

//   if (data.records.length < 1) {
//     return "No businesses found...";
//   }
//   return formattedData;
// };

// const formatName = (rawBusiness) => {
//   const fields = rawBusiness.fields;
//   return {
//     name: fields["Name"],
//     id: rawBusiness["id"],
//   };
// };
