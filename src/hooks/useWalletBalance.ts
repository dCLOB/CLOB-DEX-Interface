import { useFreighterContext } from "@/providers/FreighterProvider";
import { useCallback } from "react";
import { useTokenContract } from "@/hooks/useTokenContract";
import { useQuery } from "@tanstack/react-query";
import { formatUnits } from "@/utils";

const NATIVE_CURRENCY = "XLM";

export const useWalletBalance = (currency = NATIVE_CURRENCY) => {
  const { isConnected, address } = useFreighterContext();
  const tokenContract = useTokenContract(currency);

  const getBalance = useCallback(async () => {
    const { result: balance } = await tokenContract.balance({ id: address! });
    const { result: decimals } = await tokenContract.decimals();
    return formatUnits(balance, decimals);
  }, [address, tokenContract]);

  const { data } = useQuery({
    queryKey: ["wallet-balance", address, currency],
    queryFn: getBalance,
    enabled: isConnected,
  });

  return (data ?? "0") as `${number}`;
};
