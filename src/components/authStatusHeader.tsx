import React from "react";
import { signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";

const AuthHeader = () => {
  const { data: sessionData } = useSession();
  const { data: authData } = trpc.auth.getAuthStatus.useQuery();
  const router = useRouter();

  if (sessionData?.user) {
    return (
      <div
        id="nav"
        className="mb-4 flex items-center justify-between border-b border-slate-500 pb-4 text-xs sm:text-base"
      >
        <div>
          You are logged in as{" "}
          <span className="font-bold">{sessionData.user.email}</span>
        </div>
        <div className="flex">
          {authData?.admin && router.pathname !== "/admin" && (
            <Link
              className="mr-2 inline-flex opacity-50 hover:opacity-100 items-center justify-center"
              href={"/admin"}
            >
              <Cog6ToothIcon height={30} width={30} />
            </Link>
          )}
          <button onClick={() => signOut()} className={"btn-base text-xs"}>
            Sign out
          </button>
        </div>
      </div>
    );
  }
  return <></>;
};

export default AuthHeader;
