import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  const { data: sessionData } = useSession();

  if (sessionData?.user) {
    return (
      <>
        <div>You are logged in as {sessionData.user.email}</div>
        <div onClick={() => signOut()}>logout</div>
      </>
    );
  }

  return (
    <>
      <div>You are not logged in</div>
      <div onClick={() => signIn()}>login</div>
    </>
  );
};

export default Home;
