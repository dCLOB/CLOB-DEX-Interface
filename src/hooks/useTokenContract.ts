import { Client, networks } from "@contracts/token"; // TODO use proper package
import { useFreighterContext } from "@/providers/FreighterProvider";
import { useMemo } from "react";
import freighterApi from "@stellar/freighter-api";
import { SOROBAN_URL } from "@/constants";
import { getTokenContractId } from "@/utils";

export const useTokenContract = (token: string) => {
  const { address } = useFreighterContext();

  return useMemo(
    () =>
      new Client({
        ...networks.testnet,
        contractId: getTokenContractId(token),
        rpcUrl: SOROBAN_URL,
        signTransaction: async (x) => {
          const { signedTxXdr, error } = await freighterApi.signTransaction(x, {
            networkPassphrase: networks.testnet.networkPassphrase,
          });
          if (error) throw error;
          return signedTxXdr;
        },
        signAuthEntry: async (base64Xdr) => {
          const { signedAuthEntry, error } = await freighterApi.signAuthEntry(base64Xdr, {
            networkPassphrase: networks.testnet.networkPassphrase,
            address,
          });
          if (error) throw error;
          return signedAuthEntry!.toString("base64");
        },
        publicKey: address,
      }),
    [address, token],
  );
};