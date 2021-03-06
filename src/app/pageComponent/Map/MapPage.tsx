import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import Head from "next/head";
import React, { FC, useEffect } from "react";
import LoadingPage from "../../component/LoadingPage";
import { mapContainerStyle, options } from "../../utils/googleMapsUtil";
import Navigate from "../../utils/Navigate";
import { nearestOfficeLocation } from "../../utils/nearestOffice";
import { officeLocation } from "../../utils/officeLocation";
import MapActionsBanner from "./component/MapActionsBanner";
import { useGetDrivers } from "./hooks/useGetDrivers";

interface ILocation {
  lat: number;
  lng: number;
}

const MapPage: FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: String(process.env.NEXT_PUBLIC_GOOGLE_MAPS_TOKEN),
  });
  const {
    onMapLoad,
    selected,
    setSelected,
    setCurrentLocation,
    setLoadingLocation,
    driverError,
    driverList,
    isLoading,
    loadingLocation,
    setInitialCenter,
    slider,
    setSlider,
    switcNearestLocation,
    switchOfficeSG,
    initialCenter,
    switchOfficeUK,
  } = useGetDrivers();

  useEffect(() => {
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

        setLoadingLocation(false);
      },
      () => Navigate?.push("/error")
    );
  }, []);
  if (driverError || loadError || !isLoaded || loadingLocation) {
    if (driverError) {
      Navigate?.push("/error");
    }
    if (loadError) {
      Navigate?.push("/error");
    }
    if (!isLoaded) return <LoadingPage />;
    if (loadingLocation) return <LoadingPage />;
  }

  return (
    <>
      <Head>
        <title>Taxi Location</title>
      </Head>
      <MapActionsBanner
        setSlider={setSlider}
        slider={slider}
        switcNearestLocation={switcNearestLocation}
        switchOfficeSG={switchOfficeSG}
        switchOfficeUK={switchOfficeUK}
      />
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={initialCenter as ILocation}
        options={options}
        onLoad={onMapLoad}
      >
        <Marker
          position={{
            lat: officeLocation[0].latitude,
            lng: officeLocation[0].longitude,
          }}
          onClick={() =>
            setSelected({
              lat: officeLocation[0].latitude,
              lng: officeLocation[0].longitude,
              office: "Singapore",
            })
          }
          key="sg-office"
          title="Sg Office"
          icon={{
            url: "/office.svg",
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(30, -5),
            scaledSize: new window.google.maps.Size(50, 50),
          }}
        />
        <Marker
          position={{
            lat: officeLocation[1].latitude,
            lng: officeLocation[1].longitude,
          }}
          onClick={() =>
            setSelected({
              lat: officeLocation[1].latitude,
              lng: officeLocation[1].longitude,
              office: "London",
            })
          }
          key="london-office"
          icon={{
            url: "/office.svg",
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(30, -5),
            scaledSize: new window.google.maps.Size(50, 50),
          }}
        />
        {!isLoading &&
          driverList?.drivers?.map((res) => (
            <Marker
              position={{
                lat: res.location.latitude,
                lng: res.location.longitude,
              }}
              key={res.driver_id}
              icon={{
                url: "/taxi.svg",
              }}
            />
          ))}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2 className="text-lg font-bold">
                Splyt {selected.office} Office
              </h2>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </>
  );
};

export default MapPage;
