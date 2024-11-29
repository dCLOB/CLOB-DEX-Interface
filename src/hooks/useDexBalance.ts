import { useFreighterContext } from "@/providers/FreighterProvider";
import { useCallback } from "react";
import { useDexContract } from "@/hooks/useDexContract";
import { formatUnits, getTokenContractId } from "@/utils";
import { Client, networks } from "@contracts/token";
import { Client as DexContractClient } from "@contracts/dex";
import { SOROBAN_URL, TOKENS } from "@/constants";
import { useQuery } from "@tanstack/react-query";

export const getTokenBalance = async (dexContract: DexContractClient, user: string, token: string) => {
  try {
    const contract = new Client({
      ...networks.testnet,
      contractId: getTokenContractId(token),
      rpcUrl: SOROBAN_URL,
    });
    const { result: decimals } = await contract.decimals();
    const tx = await dexContract.balances({ user, token: getTokenContractId(token) });

    return formatUnits(tx.result.balance, decimals);
  } catch (e) {
    console.error(e);
    return "0";
  }
};

const initialData = TOKENS.reduce((obj, token) => ({ ...obj, [token]: "0" }), {});

export const useDexBalances = () => {
  const { isConnected, address } = useFreighterContext();

  const dexContract = useDexContract();

  const getBalance = useCallback(async () => {
    const res = await Promise.all(TOKENS.map((token) => getTokenBalance(dexContract, address as string, token)));
    return TOKENS.reduce((obj, token, index) => ({ ...obj, [token]: res[index] }), {});
  }, [address, dexContract]);

  const { data } = useQuery({
    queryKey: ["dex-balance", address],
    queryFn: getBalance,
    enabled: isConnected,
    refetchInterval: 2000,
  });

  return (data ?? initialData) as Record<string, `${number}`>;
};
