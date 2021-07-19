import { QueryClient } from "react-query";

export function generateQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {},
  });
}

export const queryClient = generateQueryClient();
