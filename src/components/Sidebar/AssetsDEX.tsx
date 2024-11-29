import { Box, Typography } from "@mui/material";
import { CurrencyRow } from "@/components/CurrencyRow";
import usePairStore from "@/stores/pair";
import { getCurrenciesFromPair } from "@/utils";

import { useDexBalances } from "@/hooks/useDexBalance";

export const AssetsDEX = () => {
  const pair = usePairStore((state) => state.pair);

  const dexBalances = useDexBalances();

  const { baseCurrency, quoteCurrency } = getCurrenciesFromPair(pair);

  return (
    <Box display="flex" flexDirection="column" gap={0.75}>
      <Typography>Assets on contract [for tests]</Typography>
      <CurrencyRow title="Trading Balance" value={dexBalances[baseCurrency] ?? 0} token={baseCurrency} />
      <CurrencyRow title="Trading Balance" value={dexBalances[quoteCurrency] ?? 0} token={quoteCurrency} />
    </Box>
  );
};
