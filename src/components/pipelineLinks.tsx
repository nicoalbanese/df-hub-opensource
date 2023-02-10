/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  PlusIcon,
  PhoneIcon,
  FolderIcon,
  CalculatorIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

import settings from "../../USER_CONFIG/settings.json"

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PipelineLinks() {
  return (
    <nav className="space-y-1">
      <NavItems items={settings.pipelines} />
    </nav>
  );
}
// @ts-ignore
const NavItems = ({ items }) => {
  return (
    <>
      {items.map((item: any) => (
        <Link
          key={item.name}
          target={"_blank"}
          href={item.link}
          className={classNames(
            item.current
              ? "bg-gray-100 text-gray-900"
              : "text-gray-100 hover:bg-gray-50 hover:text-gray-900",
            "text-md group flex items-center rounded-md border-b border-b-slate-600 px-3 py-3 font-medium"
          )}
          aria-current={item.current ? "page" : undefined}
        >
          <span className="truncate">{item.title}</span>
        </Link>
      ))}
    </>
  );
};
