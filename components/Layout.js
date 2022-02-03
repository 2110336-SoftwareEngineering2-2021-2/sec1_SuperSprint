import React from 'react';
import Head from 'next/Head';

export default function Layout({title, children}) {
  return (
    <div className='bg-white'>
      <Head>
        <title>{title}</title>
        {/* <meta name="description" content="Generated by create next app" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='container mx-auto pt-8 min-h-screen'>
        {children}
      </main>

    </div>
  );
}
