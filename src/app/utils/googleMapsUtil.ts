import mapStyles from "./mapStyle";

export const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
export const options = {
  styles: mapStyles as any,
  disableDefaultUI: true,
  zoomControl: true,
};
