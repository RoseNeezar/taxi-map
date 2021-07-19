/* eslint-disable no-console */
import { render, RenderResult } from "@testing-library/react";
import { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { generateQueryClient } from "../app/store/queryClient";

const mockGeolocation = {
  getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
    Promise.resolve(
      success({
        coords: {
          latitude: 51.1,
          longitude: 45.3,
        },
      })
    )
  ),
};
// @ts-ignore
global.navigator.geolocation = mockGeolocation;

const generateTestQueryClient = () => {
  const client = generateQueryClient();
  const options = client.getDefaultOptions();
  options.queries = { ...options.queries, retry: false };
  return client;
};

export function renderWithQueryClient(
  ui: ReactElement,
  client?: QueryClient
): RenderResult {
  const queryClient = client ?? generateTestQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}
