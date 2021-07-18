import React from "react";
import { useHistory } from "react-router-dom";
import Head from "next/head";

const NotFound = () => {
  const history = useHistory();
  return (
    <>
      <Head>
        <title>Lost...</title>
      </Head>
      <div className="h-screen w-full flex justify-center items-center bg-gray-800 flex-col">
        <h1 className="text-3xl text-white mb-10">Not Found</h1>
        <button
          onClick={() => history.push("/")}
          className="p-4 rounded-xl bg-gray-500 text-white text-3xl"
        >
          Go Back
        </button>
      </div>
    </>
  );
};

export default NotFound;
