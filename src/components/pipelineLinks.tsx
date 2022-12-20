/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  PlusIcon,
  PhoneIcon,
  FolderIcon,
  CalculatorIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const navigation = [
  {
    name: "Advanced (TE Team)",
    href: "https://airtable.com/apptcOM65nkIWJy1l/tblltzjPiwy7gOkKE/viwD6Q6hcF81rk0a5?blocks=hide",
    icon: FolderIcon,
    current: false,
    isExternalLink: true,
  },
  {
    name: "Blended",
    href: "https://airtable.com/apptcOM65nkIWJy1l/tblltzjPiwy7gOkKE/viwg63PSZQ8mWWeID?blocks=hide",
    icon: PlusIcon,
    current: false,
    isExternalLink: true,
  },
  {
    name: "EIS",
    href: "https://airtable.com/apptcOM65nkIWJy1l/tblltzjPiwy7gOkKE/viw4KE3PCFVTnMOE9?blocks=hide",
    icon: PhoneIcon,
    current: false,
    isExternalLink: true,
  },
  {
    name: "Conduit",
    href: "https://airtable.com/apptcOM65nkIWJy1l/tblltzjPiwy7gOkKE/viw6QS0LnnRFXIoEM?blocks=hide",
    icon: CalculatorIcon,
    current: false,
    isExternalLink: true,
  },
  {
    name: "Fund III",
    href: "https://airtable.com/apptcOM65nkIWJy1l/tblltzjPiwy7gOkKE/viwyxsIGMCDxCVtSz?blocks=hide",
    icon: CalculatorIcon,
    current: false,
    isExternalLink: true,
  },
  {
    name: "Life",
    href: "https://airtable.com/apptcOM65nkIWJy1l/tblltzjPiwy7gOkKE/viweSopifPeYfZBWM?blocks=hide",
    icon: CalculatorIcon,
    current: false,
    isExternalLink: true,
  },
];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PipelineLinks() {
  return (
    <nav className="space-y-1">
      <NavItems items={navigation} />
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
          target={item.isExternalLink ? "_blank" : ""}
          href={item.href}
          className={classNames(
            item.current
              ? "bg-gray-100 text-gray-900"
              : "text-gray-100 hover:bg-gray-50 hover:text-gray-900",
            "text-md group flex items-center rounded-md border-b border-b-slate-600 px-3 py-3 font-medium"
          )}
          aria-current={item.current ? "page" : undefined}
        >
          {/* <item.icon
            className={classNames(
              item.current
                ? "text-gray-500"
                : "text-gray-400 group-hover:text-gray-500",
              "-ml-1 mr-3 h-6 w-6 flex-shrink-0"
            )}
            aria-hidden="true"
          /> */}
          <span className="truncate">{item.name}</span>
        </Link>
      ))}
    </>
  );
};
