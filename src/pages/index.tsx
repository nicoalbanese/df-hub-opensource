import { type NextPage } from "next";
// import Head from "next/head";
// import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import Navigation from "../components/navigation";
import UniversalSearch from "../components/universalSearch";

// import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  const { data: sessionData } = useSession();

  if (sessionData?.user) {
    return (
      <main>
        <div className="my-4 flex items-center justify-between">
          <h1>Ascension Deaflow</h1>
          <UniversalSearch />

        </div>
        <div>
          <Navigation />
        </div>
      </main>
    );
  }

  return (
    <div className="">
      <h1>Ascension Dealflow</h1>
      <div className="mt-4">
        <div className="mb-2">You are not logged in. Please sign in below.</div>
        <button onClick={() => signIn()} className={"btn-base"}>
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Home;
