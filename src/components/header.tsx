// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import UniversalSearch from "./universalSearch";

const Header = ({ title = "Page" }) => {
  const router = useRouter();
  return (
    <>
      {router.pathname !== "/" && (
        <div id="header">
          <Link href="/" className="hover:underline">
            back
          </Link>
        </div>
      )}
      <div className="my-4 flex justify-between items-center">
        <h1>{title}</h1>
        <UniversalSearch />
        {/* <MagnifyingGlassIcon className="w-8 mr-2 sm:hidden" onClick={() => router.push("/search")} /> */}
      </div>
    </>
  );
};
export default Header;
