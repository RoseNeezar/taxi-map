import React from "react";
import Head from "next/head";
import Navigate from "../../utils/Navigate";
import { useGetDrivers } from "../Map/hooks/useGetDrivers";
import { nearestOfficeLocation } from "../../utils/nearestOffice";

const ErrorPage = () => {
  const { setInitialCenter, setCurrentLocation, mapRef, setLoadingLocation } =
    useGetDrivers();

  const retryLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const nearest = nearestOfficeLocation(latitude, longitude);
        setInitialCenter((prev) => ({
          ...prev,
          lat: nearest.latitude,
          lng: nearest.longitude,
        }));
        setCurrentLocation((prev) => ({
          ...prev,
          lat: nearest.latitude,
          lng: nearest.longitude,
        }));
        mapRef.current?.setCenter({
          lat: nearest.latitude,
          lng: nearest.longitude,
        });
        setLoadingLocation(false);
      },
      () => Navigate?.push("/error")
    );
    Navigate?.push("/");
  };
  return (
    <>
      <Head>
        <title>Welp...</title>
      </Head>
      <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-800">
        <h1 className="mb-10 text-3xl text-white">Location not enable ... </h1>
        <button
          onClick={() => retryLocation()}
          className="p-4 text-3xl text-white bg-gray-500 rounded-xl"
        >
          Retry getting location
        </button>
      </div>
    </>
  );
};

export default ErrorPage;
