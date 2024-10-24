import { useFreighterContext } from "@/providers/FreighterProvider";
import { useCallback, useEffect, useState } from "react";
import { Horizon } from "@stellar/stellar-sdk";

const NATIVE_CURRENCY = "XLM";

export const useBalance = (currency = NATIVE_CURRENCY) => {
  const [balance, setBalance] = useState<string>("0");

  const { client, address } = useFreighterContext();

  const getBalance = useCallback(async () => {
    if (!client || !address) return;

    const res = await client.loadAccount(address);
    const balance = res.balances.find((b) =>
      currency === NATIVE_CURRENCY
        ? b.asset_type === "native"
        : (b as Horizon.HorizonApi.BalanceLineAsset).asset_code === currency,
    )?.balance;

    if (balance) setBalance(balance);
  }, [address, client, currency]);

  useEffect(() => {
    setBalance("0");
    getBalance().catch((e) => console.error(e));
  }, [getBalance]);

  return balance as `${number}`;
};
