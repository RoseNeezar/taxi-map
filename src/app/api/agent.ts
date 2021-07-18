import axios, { AxiosResponse } from "axios";
import { IFetchDriver, IFetchDriverDto } from "../utils/type";

const instance = axios.create({
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
  },
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string, params: Object) =>
    instance.get<T>(url, { params }).then(responseBody),
};

const TaxiService = {
  fetchTaxi: (data: IFetchDriverDto) =>
    requests.get<IFetchDriver>(`/api/drivers`, data),
};

const agent = {
  TaxiService,
};

export default agent;
