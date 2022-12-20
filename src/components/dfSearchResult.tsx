import { BanknotesIcon, CalendarIcon, FlagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { type Company } from "../utils/airtable";


const statusColor = (status: string) => {
  switch (status) {
    case "Passed":
      return "bg-red-300";
      break;
    case "Invested":
      return "bg-green-300";
      break;
    default:
      return "bg-blue-300";
      break;
  }
};

const SearchResult = ({ company }: { company: Company }) => {
  const router = useRouter();
  return (
    <li className=" rounded-md">
      <Link
        href={company.recordUrl}
        target="_blank"
        className="block hover:bg-slate-300"
        onClick={() => router.push("/")}
      >
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="truncate text-sm font-medium text-indigo-600">
                {company.name}
              </p>
              <p className="text-sm  text-slate-800">{company.description}</p>
            </div>
            <div className="ml-2 flex flex-shrink-0">
              <p
                className={`inline-flex rounded-full ${statusColor(
                  company.status
                )} px-2 text-xs font-semibold leading-5 text-slate-800`}
              >
                {company.status}
              </p>
            </div>
          </div>
          <div className="mt-2 sm:flex sm:justify-between">
            <div className="sm:flex">
              <p className="flex items-center text-sm text-gray-500">
                <BanknotesIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                {company.fund ? company.fund : "No fund set"}
              </p>
              {/* {company.website && (
                <Link
                  className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6"
                  href={company.website}
                  target="_blank"
                >
                  <MapPinIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  website
                </Link>
              )} */}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <p>
                last status change {company.lastStatusChange}
                {/* <time dateTime={company.lastStatusChange}>date</time> */}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default SearchResult;
