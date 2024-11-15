import { TOKEN_ADDRESSES } from "@/constants";

export const getCurrenciesFromPair = (pair: string = "") => {
  const [baseCurrency, quoteCurrency] = pair.split("-");
  return { baseCurrency, quoteCurrency };
};

export const getTokenContractId = (token: string) => TOKEN_ADDRESSES[token as keyof typeof TOKEN_ADDRESSES];

export const formatUnits = (value: bigint, decimals = 7): string => (Number(value) * 10 ** -decimals).toString();

export const parseUnits = (value: number | string, decimals = 7): bigint => BigInt(Number(value) * 10 ** decimals);
