import { useQuery } from "@tanstack/react-query";

import { MarketResponse } from "./types";
import { API, REFETCH_INTERVAL } from "../api";
import { AxiosResponse } from "axios";

export const useMarkets = () =>
  useQuery<AxiosResponse<MarketResponse[]>>({
    queryKey: ["markets"],
    queryFn: () => API.get("api/mocks/v1/markets"),
    refetchInterval: REFETCH_INTERVAL,
  });
