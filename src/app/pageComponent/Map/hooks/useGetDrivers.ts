import { useState, useCallback, useRef } from "react";
import { useQuery } from "react-query";
import agent from "../../../api/agent";
import {
  distanceCalculation,
  nearestOfficeLocation,
} from "../../../utils/nearestOffice";
import { officeLocation } from "../../../utils/officeLocation";
import { Driver, IFetchDriver } from "../../../utils/type";

interface ILocation {
  lat: number;
  lng: number;
}

export const useGetDrivers = () => {
  const [initialCenter, setInitialCenter] = useState<Partial<ILocation>>({});
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

  const selectFn = useCallback(
    (item: IFetchDriver) => {
      const sortDistance = item?.drivers.sort(
        (a: Driver, b: Driver) =>
          distanceCalculation(
            Number(mapRef.current?.getCenter().toJSON().lat),
            Number(mapRef.current?.getCenter().toJSON().lng),
            a.location.latitude,
            a.location.longitude
          ) -
          distanceCalculation(
            Number(mapRef.current?.getCenter().toJSON().lat),
            Number(mapRef.current?.getCenter().toJSON().lng),
            b.location.latitude,
            b.location.longitude
          )
      );
      const taxiNum = sortDistance?.slice(0, slider).map((re: Driver) => re);
      return {
        ...item,
        drivers: taxiNum,
      };
    },
    [slider]
  );

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
        latitude:
          Number(mapRef.current?.getCenter().toJSON().lat) ||
          initialCenter.lat!,
        longitude:
          Number(mapRef.current?.getCenter().toJSON().lng) ||
          initialCenter.lng!,
      }),
    {
      refetchInterval: 10000, //refetch every 10s
      enabled: !loadingLocation && !!initialCenter,
      select: selectFn,
    }
  );

  return {
    mapRef,
    onMapLoad,
    initialCenter,
    setInitialCenter,
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
