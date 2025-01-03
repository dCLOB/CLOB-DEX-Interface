import { useMutation, useQuery } from "@tanstack/react-query";
import { Order, OrderCreateData } from "./types";
import { API, REFETCH_INTERVAL } from "@/api/api";
import { AxiosResponse } from "axios";
import { useFreighterContext } from "@/providers/FreighterProvider";

export const useCreateOrder = () =>
  useMutation({
    mutationFn: (data: OrderCreateData) => API.post("api/mocks/v1/orders", data),
  });

export const useGetOpenOrders = () => {
  const { isConnected, address } = useFreighterContext();

  return useQuery<AxiosResponse<Order[]>>({
    queryKey: ["orders", address],
    queryFn: () => API.get("api/mocks/v1/orders"),
    enabled: isConnected,
    refetchInterval: REFETCH_INTERVAL,
  });
};

export const useCancelOrder = () =>
  useMutation({
    mutationFn: (id: Order["id"]) => API.delete(`api/mocks/v1/orders/${id}`),
  });

export const useGetOrderHistory = () => {
  const { isConnected, address } = useFreighterContext();

  return useQuery<AxiosResponse<Order[]>>({
    queryKey: ["order-history", address],
    queryFn: () => API.get("api/mocks/v1/orders/history"),
    enabled: isConnected,
    refetchInterval: REFETCH_INTERVAL,
  });
};
