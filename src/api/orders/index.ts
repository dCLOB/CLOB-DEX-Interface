import { useMutation, useQuery } from "@tanstack/react-query";
import { Order, OrderCreateData } from "./types";
import { API } from "@/api/api";
import { AxiosResponse } from "axios";
import { useFreighterContext } from "@/providers/FreighterProvider";

export const useCreateOrder = () =>
  useMutation({
    mutationFn: (data: OrderCreateData) => API.post("api/mocks/v1/orders", data),
  });

export const useGetOpenOrders = () => {
  const { isConnected } = useFreighterContext();

  return useQuery<AxiosResponse<Order[]>>({
    queryKey: ["orders"],
    queryFn: () => API.get("api/mocks/v1/orders"),
    enabled: isConnected,
  });
};

export const useCancelOrder = () =>
  useMutation({
    mutationFn: (id: Order["id"]) => API.delete(`api/mocks/v1/orders/${id}`),
  });
