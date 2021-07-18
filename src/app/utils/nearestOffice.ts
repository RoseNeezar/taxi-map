import { officeLocation } from "./officeLocation";

//https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
const distanceCalculation = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  var p = 0.017453292519943295; // Math.PI / 180
  var c = Math.cos;
  var a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
};

export const nearestOfficeLocation = (
  currLatitude: number,
  currLongitude: number
) => {
  return officeLocation.reduce((prev, curr) => {
    const prevDistance = distanceCalculation(
      currLatitude,
      currLongitude,
      prev.latitude,
      prev.longitude
    );
    const currDistance = distanceCalculation(
      currLatitude,
      currLongitude,
      curr.latitude,
      curr.longitude
    );
    return currDistance < prevDistance ? curr : prev;
  });
};
