import React from "react";
import Head from "next/Head";

export default function Layout({ title, children }) {
  return (
    <div className="bg-base-200">
      <Head>
        <title>{title}</title>
        {/* <meta name="description" content="Generated by create next app" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto min-h-screen pt-8">{children}</main>
    </div>
  );
}
