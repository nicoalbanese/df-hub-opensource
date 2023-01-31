import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CompanyDesc = () => {
  const router = useRouter();
  const { companyNumber } = router.query;

  const [companyInfo, setCompanyInfo] = useState();
  const [hasSearched, setHasSearched] = useState(false);

  const findCompany = async (companyNumberParams: string) => {
    const req = await fetch(
      "/api/sourcing/companyInfo?" +
        new URLSearchParams({ companyNumber: companyNumberParams })
    );
    const res = await req.json();
    console.log(res);
    setCompanyInfo(res);
  };

  useEffect(() => {
    if (companyNumber && !hasSearched) {
      findCompany(companyNumber as string);
    }
  }, [companyNumber, hasSearched]);

  return (
    <>
      <Link href={"/source-ch"}>back</Link>
      {companyInfo && <Company company={companyInfo} />}
    </>
  );
};

export default CompanyDesc;

const Company = ({ company }: any) => {
  return (
    <main id="company-page">
    <Head>
      <title>{company.company_name}</title>
    </Head>
      <h1>{company.company_name}</h1>
      <Link
        href={
          "https://find-and-update.company-information.service.gov.uk/company/" +
          company.company_number
        }
      >
        Companies House page
      </Link>
      <h3>Officers</h3>
      {company.officerData.items.map((officer: any, i: number) => (
        <div key={i}>
          <Link
            href={
              "https://www.linkedin.com/search/results/all/?keywords=" +
              officer.name.split(", ")[1].split(" ")[0].toLowerCase() +
              " " +
              officer.name.split(", ")[0].toLowerCase()
            }
            target="_blank"
          >
            {officer.name.split(", ")[1]} {officer.name.split(", ")[0]}
          </Link>
          {officer.date_of_birth && (
            <span> (dob: {officer.date_of_birth.year})</span>
          )}
        </div>
      ))}
    </main>
  );
};
