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
      <div className="my-4 flex justify-between">
        <h1>{title}</h1>
        <UniversalSearch />
      </div>
    </>
  );
};
export default Header;
