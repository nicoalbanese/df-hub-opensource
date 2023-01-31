import { PhotoIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";

const EXCLUSION_LIST = "technologies technology IT";

export default function Home() {
  const [results, setResults] = useState([]);

  const fetchResults = async (date: string, fund: string) => {
    const searchReq = await fetch(
      "/api/sourcing/findCompanies?" + new URLSearchParams({ date, fund })
    );
    const searchResults = await searchReq.json();
    setResults(searchResults.items);
  };

  const handleSubmit = (event: {
    preventDefault: () => void;
    target: HTMLFormElement;
  }) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());
    console.log(formData);
    console.log(formData.date);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   @ts-ignore
    fetchResults(formData.date.toString(), formData.fund?.toString());
    // event.target?.reset();
  };
  return (
    <main id="companies-house-search">
      <Link href={"/"}>back</Link>
      <h1>Companies House Search</h1>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <form className="mt-8 flex w-full flex-col pb-6" onSubmit={handleSubmit}>
        <div className="mb-2 flex flex-col">
          <label
            htmlFor="fund"
            className="block text-sm font-medium text-slate-300"
          >
            Fund
          </label>
          <select
            className="block w-full rounded-md border-gray-300 text-slate-900 text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            name="fund"
          >
            <option value="generalist">generalist</option>
            <option value="life">life</option>
          </select>
        </div>
        <div className="flex">
          <div className="flex-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-300"
            >
              Date
            </label>
            <div className="mt-1">
              <input
                type="date"
                name="date"
                id="date"
                required
                className="block w-full rounded-md border-gray-300 text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="2023-01-01"
              />
            </div>
          </div>
          <div className="flex items-end">
            <input
              type="submit"
              className="ml-2 inline-flex h-fit items-center rounded border border-transparent bg-indigo-600 px-2.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            />
          </div>
        </div>
      </form>
      {results.length > 0 && (
        <div className="mt-4 mb-8 bg-slate-50 p-5 text-slate-900">
          <div className="mb-4 font-light italic text-slate-600">
            {results.length} results - click company for more info
          </div>
          {results.map((result: any, i) => (
            <SearchResult
              result={result}
              key={result.company_name}
              _open={false}
            />
          ))}
        </div>
      )}
    </main>
  );
}

const SearchResult = ({
  result,
  _open = false,
}: {
  result: any;
  _open: boolean;
}) => {
  const [open, setOpen] = useState(_open);
  const [fetching, setFetching] = useState(true);
  const [companyDetails, setCompanyDetails] = useState({});

  const getCompanyInfo = async () => {
    setOpen(true);
    const req = await fetch(
      "/api/sourcing/companyInfo?" +
        new URLSearchParams({ companyNumber: result.company_number })
    );
    const res = await req.json();
    setFetching(false);
    setCompanyDetails(res);
    // setCompanyInfo(res);
  };

  return (
    <div>
      <div
        onClick={getCompanyInfo}
        className={`${!open && "cursor-pointer hover:opacity-75"} ${
          open && "my-2 bg-slate-300 p-3"
        } my-1`}
      >
        <div className="flex items-center justify-between">
          <div className={`${open && "text-lg font-bold"}`}>
            {result.company_name}
          </div>
          <div className="ml-2">
            {result.sic_codes.map((code: string) => (
              <span
                key={code}
                className={`${
                  (code == "62012" ||
                    code == "62090" ||
                    code == "58290" ||
                    code == "62011") &&
                  "bg-yellow-200"
                } mr-2  text-xs opacity-75`}
              >
                {" "}
                {code}{" "}
              </span>
            ))}
          </div>
        </div>
        {open && (
          <div>
            {fetching && <>loading...</>}
            {!fetching && <DetailedCompanyInfo company={companyDetails} />}
          </div>
        )}
      </div>
    </div>
  );
};

const DetailedCompanyInfo = ({ company }: any) => {
  return (
    <main id="company-page">
      {/* <p className="text-sm font-bold uppercase text-slate-900">Officers</p> */}
      <div className="mt-2">
        {company.officerData.items.map((officer: any, i: number) => (
          <div key={i} className="mb-1">
            <div>
              {officer.name && (
                <>
                  {officer.name.includes(",") ? (
                    <>
                      <span className="mr-1">
                        {officer.name.split(", ")[1]}{" "}
                        {officer.name.split(", ")[0]}
                      </span>
                      {officer.date_of_birth && (
                        <span className="mr-2 text-sm text-slate-600">
                          {" "}
                          (dob: {officer.date_of_birth.year})
                        </span>
                      )}
                      <Link
                        href={
                          "https://www.linkedin.com/search/results/all/?keywords=" +
                          officer.name
                            .split(", ")[1]
                            .split(" ")[0]
                            .toLowerCase() +
                          " " +
                          officer.name.split(", ")[0].toLowerCase()
                        }
                        target="_blank"
                        style={{ textDecoration: "none" }}
                        className="mr-2 rounded-md bg-[#0A66C2] py-1 px-1.5 text-xs text-[white] hover:opacity-70"
                      >
                        LinkedIn
                      </Link>
                      <Link
                        href={
                          "https://twitter.com/search?q=" +
                          officer.name
                            .split(", ")[1]
                            .split(" ")[0]
                            .toLowerCase() +
                          " " +
                          officer.name.split(", ")[0].toLowerCase() +
                          "&src=typed_query"
                        }
                        target="_blank"
                        style={{ textDecoration: "none" }}
                        className="mr-2 rounded-md bg-[#1DA1F2] py-1 px-1.5 text-xs text-[white] hover:opacity-70"
                      >
                        Twitter
                      </Link>
                    </>
                  ) : (
                    <>{officer.name}</>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <div>
        <Link
          href={
            "https://find-and-update.company-information.service.gov.uk/company/" +
            company.company_number
          }
          target={"_blank"}
          id="no-underline"
          style={{ textDecoration: "none" }}
          className="mt-3 inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 no-underline hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Open Companies House
        </Link>
        <Link
          href={
            "https://airtable.com/shr0BQtxyw7pITxq4?prefill_Company=" +
            company.company_name
          }
          target={"_blank"}
          id="no-underline"
          style={{ textDecoration: "none" }}
          className="ml-2 inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add to DF Pipeline
        </Link>
      </div>
    </main>
  );
};
