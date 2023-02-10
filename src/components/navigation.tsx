/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  PlusIcon,
  PhoneIcon,
  FolderIcon,
  PencilSquareIcon,
  CalculatorIcon,
  MagnifyingGlassIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

import settings from "../../USER_CONFIG/settings.json";

const navigation = [
  {
    name: "Pipelines",
    href: "/pipelines",
    icon: FolderIcon,
    current: false,
    isExternalLink: false,
  },
  {
    name: "New Company",
    href: settings.default_forms.new_company.link,
    icon: PlusIcon,
    current: false,
    isExternalLink: true,
  },
  {
    name: "New Note",
    href: settings.default_forms.new_note.link,
    icon: PhoneIcon,
    current: false,
    isExternalLink: true,
  },
  {
    name: "Triage Website Applications",
    href: "/triage",
    icon: MagnifyingGlassIcon,
    current: false,
    isExternalLink: false,
  },

  // {
  //   name: "New Score",
  //   href: "/score/new",
  //   icon: CalculatorIcon,
  //   current: false,
  //   isExternalLink: true,
  // },
];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  // const { data: sessionData } = useSession();
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
          <item.icon
            className={classNames(
              item.current
                ? "text-gray-500"
                : "text-gray-400 group-hover:text-gray-500",
              "-ml-1 mr-3 h-6 w-6 flex-shrink-0"
            )}
            aria-hidden="true"
          />
          <span className="truncate">{item.name}</span>
        </Link>
      ))}
    </>
  );
};
