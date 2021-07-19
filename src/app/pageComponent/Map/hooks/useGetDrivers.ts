import { useState, useCallback, useRef } from "react";
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

  const mapRef = useRef<google.maps.Map | null>(null);
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const switchOfficeUK = useCallback(() => {
    setSelected(null);
    mapRef.current?.setCenter({
      lat: officeLocation[1].latitude,
      lng: officeLocation[1].longitude,
    });
    refetch();
  }, []);

  const switchOfficeSG = useCallback(() => {
    setSelected(null);
    mapRef.current?.setCenter({
      lat: officeLocation[0].latitude,
      lng: officeLocation[0].longitude,
    });
    refetch();
  }, []);

  const switcNearestLocation = useCallback(() => {
    setSelected(null);
    const nearest = nearestOfficeLocation(
      currentLocation.lat!,
      currentLocation.lng!
    );

    mapRef.current?.setCenter({
      lat: nearest.latitude,
      lng: nearest.longitude,
    });
    refetch();
  }, []);

  const {
    data: driverList,
    isLoading,
    error: driverError,
    refetch,
  } = useQuery<IFetchDriver>(
    ["drivers", switchOfficeSG, switchOfficeUK],
    async () =>
      await agent.TaxiService.fetchTaxi({
        count: 15,
        latitude: Number(mapRef.current?.getCenter().toJSON().lat),
        longitude: Number(mapRef.current?.getCenter().toJSON().lng),
      }),
    {
      refetchInterval: 10000, //refetch every 10s
      enabled: !loadingLocation && !!viewport,
    }
  );

  const selectFn = useCallback(() => {
    const taxiNum = driverList?.drivers.slice(0, slider).map((re) => re);
    return {
      ...driverList,
      drivers: taxiNum,
    };
  }, [slider, driverList]);

  return {
    selectFn,
    mapRef,
    onMapLoad,
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
