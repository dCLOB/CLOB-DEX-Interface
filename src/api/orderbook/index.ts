import { useQuery } from "@tanstack/react-query";

import { OrderbookResponse } from "./types";
import { API, REFETCH_INTERVAL } from "../api";
import { AxiosResponse } from "axios";
import usePairStore from "@/stores/pair";

export const useGetOrderbook = () => {
  const pair = usePairStore((state) => state.pair);

  return useQuery<AxiosResponse<OrderbookResponse>>({
    queryKey: ["orderbok", pair],
    queryFn: () => API.get(`api/mocks/v1/orderbook/${pair}`),
    refetchInterval: REFETCH_INTERVAL,
  });
};
