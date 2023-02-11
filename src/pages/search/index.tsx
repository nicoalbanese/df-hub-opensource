import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";

import Back from "../../components/backButton";
import SearchResult from "../../components/dfSearchResult";
import NotLoggedIn from "../../components/NotLoggedIn";
import UniversalSearch from "../../components/universalSearch";
import { type Company, searchForBusiness } from "../../utils/airtable";
import settings from "../../../USER_CONFIG/settings.json";
import Link from "next/link";

const PipelineSearch = () => {
  const router = useRouter();
  const { companyName } = router.query;
  const [searchQuery, setSearchQuery] = useState<string>(companyName as string);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [queryResultStatus, setQueryResultStatus] = useState<
    "success" | "no results" | "init"
  >("init");
  const updatedLink = useMemo(() => `${settings.default_forms.new_company.link}?prefill_Company=${searchQuery}`, [searchQuery])

  const { data: sessionData } = useSession();


  useEffect(() => {
    if (!companyName) {
      return;
    } else {
      queryAirtable(companyName as string);
    }
  }, [companyName, router]);

  const queryAirtable = async (_companyName: string) => {
    // add query logic here
    console.log(_companyName);
    setSearchQuery(_companyName);
    setLoading(true);
    const results = await searchForBusiness(_companyName);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setQueryResultStatus(results.status);
    setCompanies(results.companies);
    setLoading(false);
  };

  if (sessionData?.user) {
    return (
      <div>
        <Back />
        <h1 className="mb-4">Search Pipeline</h1>
        <UniversalSearch
          initialSearchQuery={companyName as string}
          queryAirtable={queryAirtable}
          disabled={loading}
        />
        {loading ? (
          <div className="my-4">loading...</div>
        ) : (
          <>
            {/* iterate through search results */}
            {queryResultStatus === "success" && (
              <div className="mt-4 overflow-hidden bg-slate-100 sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-400">
                  {companies.map((company, i) => (
                    <SearchResult key={i} company={company} />
                  ))}
                </ul>
              </div>
            )}

            {queryResultStatus === "no results" && (
              <div className="mt-4">
                No results found... {" "}
                <Link href={updatedLink} className="underline hover:opacity-70">click here</Link> to add{" "}
                <span className="font-fold mx-1 rounded-md bg-indigo-600 p-1">
                  "{companyName}"
                </span>{" "}
                to the pipeline{" "}
              </div>
            )}
          </>
        )}
      </div>
    );
  }
  return <NotLoggedIn />;
};

export default PipelineSearch;
