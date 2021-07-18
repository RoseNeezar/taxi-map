import React from "react";
import Head from "next/head";
import Navigate from "../../utils/Navigate";

const NotFound = () => {
  return (
    <>
      <Head>
        <title>Lost...</title>
      </Head>
      <div className="h-screen w-full flex justify-center items-center bg-gray-800 flex-col">
        <h1 className="text-3xl text-white mb-10">Not Found</h1>
        <button
          onClick={() => Navigate?.push("/")}
          className="p-4 rounded-xl bg-gray-500 text-white text-3xl"
        >
          Go Back
        </button>
      </div>
    </>
  );
};

export default NotFound;
