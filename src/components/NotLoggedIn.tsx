import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const NotLoggedIn = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  useEffect(() => {
    !sessionData?.user && router.push("/");
  }, []);
  return (
    <>
      You are not logged in. Please{" "}
      <Link href="/" className="hover:underline">
        go home
      </Link>{" "}
      to login
    </>
  );
};

export default NotLoggedIn;
