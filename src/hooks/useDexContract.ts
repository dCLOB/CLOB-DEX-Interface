import { Client, networks } from "@contracts/dex";
import { useFreighterContext } from "@/providers/FreighterProvider";
import { useMemo } from "react";
import freighterApi from "@stellar/freighter-api";
import { SOROBAN_URL } from "@/constants";

export const useDexContract = () => {
  const { address } = useFreighterContext();

  return useMemo(
    () =>
      new Client({
        ...networks.testnet,
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
    [address],
  );
};
