import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import AuthHeader from "../components/authStatusHeader";
import Head from "next/head";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Ascension Dealflow</title>
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-3xl pt-4">
          <AuthHeader />
          <>
            <Component {...pageProps} />
          </>
        </div>
      </div>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
