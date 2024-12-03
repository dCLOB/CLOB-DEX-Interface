import { TOKEN_ADDRESSES } from "@/constants";
import BigNumber from "bignumber.js";

export const getCurrenciesFromPair = (pair: string = "") => {
  const [baseCurrency, quoteCurrency] = pair.split("-");
  return { baseCurrency, quoteCurrency };
};

export const getTokenContractId = (token: string) => TOKEN_ADDRESSES[token as keyof typeof TOKEN_ADDRESSES];

export const formatUnits = (value: bigint, decimals = 7): string =>
  BigNumber(value.toString())
    .multipliedBy(10 ** -decimals)
    .toString();

export const parseUnits = (value: number | string, decimals = 7): bigint =>
  BigInt(
    BigNumber(value)
      .multipliedBy(10 ** decimals)
      .toString(),
  );
