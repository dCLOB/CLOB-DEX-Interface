export const getCurrenciesFromPair = (pair: string = "") => {
  const [baseCurrency, quoteCurrency] = pair.split("-");
  return { baseCurrency, quoteCurrency };
};
