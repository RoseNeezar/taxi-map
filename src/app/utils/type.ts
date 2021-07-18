export interface IFetchDriverDto {
  latitude: number;
  longitude: number;
  count: number;
}

export interface Location {
  latitude: number;
  longitude: number;
  bearing: number;
}

export interface Driver {
  driver_id: string;
  location: Location;
}

export interface IFetchDriver {
  pickup_eta: number;
  drivers: Driver[];
}

export interface IFetchDriverPayload {
  latitude: number;
  longitude: number;
  count: number;
}
