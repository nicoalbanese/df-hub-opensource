import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [results, setResults] = useState([]);
  const [searchPreference, setSearchPreference] =
    useState<string>("generalist");

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
    console.log(formData)
    console.log(formData.date);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   @ts-ignore
    fetchResults(formData.date.toString(), formData.fund?.toString());
    // event.target?.reset();
  };
  return (
    <main id="companies-house-search">
      <h1>Companies House Search</h1>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <form className="mt-8 flex w-full flex-col pb-6" onSubmit={handleSubmit}>
        <div className="flex flex-col mb-2">
            <label htmlFor="fund" className="block text-sm font-medium text-slate-300">Fund</label>
            <select className="text-slate-900 block w-full rounded-md border-gray-300 text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" name="fund">
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
        <div className="mt-4 bg-slate-50 p-5 text-slate-900">
          <div className="mb-4 italic font-light text-slate-600">{results.length} results</div>
          {results.map((result: any, i) => (
            <div key={i}>
              <div>
                <Link href={"/source-ch/company/" + result.company_number}>
                  {result.company_name}
                </Link>
                <span className="ml-2">
                  {result.sic_codes.map((code: string) => (
                    <span
                      key={code}
                      className={`${
                        (code == "62012" ||
                          code == "62090" ||
                          code == "58290" ||
                          code == "62011") &&
                        "bg-yellow-200"
                      } mr-2 `}
                    >
                      {" "}
                      {code}{" "}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
