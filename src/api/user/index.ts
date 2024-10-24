import { useMutation, useQuery } from "@tanstack/react-query";

import { API } from "../api";
import { AxiosResponse } from "axios";
import { UserData } from "@/app/api/mocks/services/users";
import { DepositData } from "@/api/user/types";

export const useGetBalance = (address?: string) =>
  useQuery<AxiosResponse<UserData>>({
    queryKey: ["balance", address],
    queryFn: () => API.get("api/mocks/v1/user/balance", { params: { address } }),
    enabled: Boolean(address),
  });

export const useDeposit = () =>
  useMutation({
    mutationFn: (data: DepositData) => API.post("api/mocks/v1/user/deposit", data),
  });

export const useWithdraw = () =>
  useMutation({
    mutationFn: (data: DepositData) => API.post("api/mocks/v1/user/withdraw", data),
  });
