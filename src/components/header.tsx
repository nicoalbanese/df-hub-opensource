import React from "react";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: sessionData } = useSession();

  if (sessionData?.user) {
    return (
      <div
        id="nav"
        className="mb-4 flex items-center justify-between border-b border-slate-500 pb-4"
      >
        <div>
          You are logged in as{" "}
          <span className="font-bold">{sessionData.user.email}</span>
        </div>
        <button onClick={() => signOut()} className={"btn-base"}>
          Sign out
        </button>
      </div>
    );
  }
  return (
    <>
      {" "}
      <div
        id="nav"
        className="mb-4 flex items-center justify-between border-b border-slate-500 pb-4"
      >
        <div>
          You are logged in as{" "}
          <span className="font-bold blur-sm">john@doe.com</span>
        </div>
        <button onClick={() => signOut()} className={"btn-base"}>
          Sign out
        </button>
      </div>
    </>
  );
};

export default Header;
