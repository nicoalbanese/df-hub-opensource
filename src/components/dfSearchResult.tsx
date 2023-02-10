import { BanknotesIcon, CalendarIcon, DocumentMagnifyingGlassIcon, GlobeAltIcon, PresentationChartBarIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { type Company } from "../utils/airtable";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";

const statusColor = (status: string) => {
  switch (status) {
    case "Passed":
      return "bg-red-300";
      break;
    case "To Reject (rejection note required)":
      return "bg-red-100";
      break;
    case "Post Call - Action Required":
      return "bg-orange-200";
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
  dayjs.extend(relativeTime);
  const [hovered, setHovered] = useState(false);

  const buttonStylesOld =
    "p-4 bg-gray-400 min-w-[100px] text-center h-fit hover:opacity-75 cursor-pointer rounded-md font-bold uppercase text-sm";

  const buttonStyles =
    "inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2";
  return (
    <li
      className=" relative rounded-md"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* <Link
        href={company.recordUrl}
        target="_blank"
        className="block hover:bg-slate-300"
      > */}
      <div
        className={`absolute flex h-full w-full items-center justify-around bg-slate-100 bg-opacity-75 ${
          hovered ? "" : "hidden"
        }`}
      >
        {company.website && (
          <div>
            <Link className={buttonStyles} href={company.website} target="_blank">
              <span>Website</span>
              <GlobeAltIcon className="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        )}
        {company.deck && (
          <div>
            <Link className={buttonStyles} href={company.deck} target="_blank">
              <span>Deck</span>
              <PresentationChartBarIcon className="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        )}
        {company.recordUrl && (
          <div>
            <Link className={buttonStyles} href={company.recordUrl} target="_blank">
              <span>Airtable</span>
              <DocumentMagnifyingGlassIcon className="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
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
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
            <CalendarIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <p>
              last status change {dayjs(company.lastStatusChange).fromNow()}
              {/* <time dateTime={company.lastStatusChange}>date</time> */}
            </p>
          </div>
        </div>
      </div>
      {/* </Link> */}
    </li>
  );
};

export default SearchResult;
