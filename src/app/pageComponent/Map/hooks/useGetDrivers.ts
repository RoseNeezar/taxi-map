import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import agent from "../../../api/agent";
import { nearestOfficeLocation } from "../../../utils/nearestOffice";
import { officeLocation } from "../../../utils/officeLocation";
import { IFetchDriver } from "../../../utils/type";

interface ILocation {
  lat: number;
  lng: number;
}

export const useGetDrivers = () => {
  const [viewport, setViewport] = useState<Partial<ILocation>>({});
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<Partial<ILocation>>(
    {}
  );

  const [slider, setSlider] = useState(1);
  const [selected, setSelected] = useState<any>(null);

  const switchOfficeUK = useCallback(() => {
    setSelected(null);
    setViewport((prev) => ({
      ...prev,
      lat: officeLocation[1].latitude,
      lng: officeLocation[1].longitude,
    }));
  }, []);
  const switchOfficeSG = useCallback(() => {
    setSelected(null);
    setViewport((prev) => ({
      ...prev,
      lat: officeLocation[0].latitude,
      lng: officeLocation[0].longitude,
    }));
  }, []);
  const switcNearestLocation = useCallback(() => {
    setSelected(null);
    const nearest = nearestOfficeLocation(
      currentLocation.lat!,
      currentLocation.lng!
    );
    setViewport((prev) => ({
      ...prev,
      lat: nearest.latitude,
      lng: nearest.longitude,
    }));
  }, [nearestOfficeLocation]);

  const {
    data: driverList,
    isLoading,
    error: driverError,
  } = useQuery<IFetchDriver>(
    ["drivers", slider, switchOfficeSG, switchOfficeUK],
    async () =>
      await agent.TaxiService.fetchTaxi({
        count: slider,
        latitude: Number(viewport.lat),
        longitude: Number(viewport.lng),
      }),
    {
      refetchInterval: 10000, //refetch every 10s
      enabled: !loadingLocation,
    }
  );
  return {
    viewport,
    setViewport,
    loadingLocation,
    setLoadingLocation,
    currentLocation,
    setCurrentLocation,
    driverList,
    isLoading,
    driverError,
    switchOfficeUK,
    switchOfficeSG,
    switcNearestLocation,
    slider,
    setSlider,
    selected,
    setSelected,
  };
};
