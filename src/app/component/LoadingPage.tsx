import React from "react";
import Head from "next/head";

const LoadingPage = () => {
  return (
    <>
      <Head>
        <title>Loading...</title>
      </Head>
      <div className="h-screen w-full flex justify-center items-center bg-gray-800 flex-col">
        <h1 className="text-3xl text-white mb-10">Fetching Location ...</h1>
        <div className=" loading-spinner" />
      </div>
    </>
  );
};

export default LoadingPage;
