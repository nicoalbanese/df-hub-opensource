import { type NextPage } from "next";
// import Head from "next/head";
// import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import Navigation from "../components/navigation";
import UniversalSearch from "../components/universalSearch";

import settings from "../../USER_CONFIG/settings.json";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: sessionData, status } = useSession();
  const { data: userData, status: userDataStatus } =
    trpc.auth.getAuthStatus.useQuery();

  if (status == "loading") {
    return <></>;
  }
  if (status == "authenticated") {
    if (userDataStatus == "loading") {
      return <></>;
    } else {
      if (userData?.authorised) {
        return (
          <main>
            <div className="my-4 flex items-center justify-between">
              <h1 className="">
                {settings.company_name.length > 0
                  ? settings.company_name
                  : "*PLEASE FILL IN SETTINGS.JSON*"}{" "}
                Deaflow
              </h1>
              <UniversalSearch />
            </div>
            <div>
              <Navigation />
            </div>
          </main>
        );
      } else {
        return (
          <main>
            <div className="my-4">
              <h1>Unauthorised</h1>
              <p className="mt-2">
                Please ask your admin to approve your account.
              </p>
            </div>
          </main>
        );
      }
    }
  }

  if (status == "unauthenticated") {
    return (
      <div className="">
        <h1>{settings.company_name} Dealflow</h1>
        <div className="mt-4">
          <div className="mb-2">
            You are not logged in. Please sign in below.
          </div>
          <button onClick={() => signIn()} className={"btn-base"}>
            Sign in
          </button>
        </div>
      </div>
    );
  }
  return <>loading...</>
};

export default Home;
