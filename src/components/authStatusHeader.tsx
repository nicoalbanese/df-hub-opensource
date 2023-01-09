import React from "react";
import { signOut, useSession } from "next-auth/react";

const AuthHeader = () => {
  const { data: sessionData } = useSession();

  if (sessionData?.user) {
    return (
      <div
        id="nav"
        className="mb-4 flex items-center text-xs sm:text-base justify-between border-b border-slate-500 pb-4"
      >
        <div>
          You are logged in as{" "}
          <span className="font-bold">{sessionData.user.email}</span>
        </div>
        <button onClick={() => signOut()} className={"btn-base text-xs"}>
          Sign out
        </button>
      </div>
    );
  }
  return <></>;
};

export default AuthHeader;
