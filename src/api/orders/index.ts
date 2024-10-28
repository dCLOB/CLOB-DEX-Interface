import { useMutation, useQuery } from "@tanstack/react-query";
import { Order, OrderCreateData } from "./types";
import { API } from "@/api/api";
import { AxiosResponse } from "axios";

export const useCreateOrder = () =>
  useMutation({
    mutationFn: (data: OrderCreateData) => API.post("api/mocks/v1/orders", data),
  });

export const useGetOpenOrders = () =>
  useQuery<AxiosResponse<Order[]>>({
    queryKey: ["orders"],
    queryFn: () => API.get("api/mocks/v1/orders"),
  });
