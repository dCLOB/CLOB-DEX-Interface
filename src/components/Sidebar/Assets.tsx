import { Box, Button, Typography } from "@mui/material";
import { CurrencyRow } from "@/components/CurrencyRow";
import { useGetBalance } from "@/api/user";
import { useFreighterContext } from "@/providers/FreighterProvider";
import usePairStore from "@/stores/pair";
import { getCurrenciesFromPair } from "@/utils";
import { useState } from "react";
import { Deposit } from "@/components/Deposit";

export const Assets = () => {
  const pair = usePairStore((state) => state.pair);

  const { address } = useFreighterContext();
  const { data } = useGetBalance(address);

  const { baseCurrency, quoteCurrency } = getCurrenciesFromPair(pair);

  const [depositOpen, setDepositOpen] = useState(false);

  return (
    <Box display="flex" flexDirection="column" gap={0.75}>
      <Typography>Assets</Typography>
      <CurrencyRow title="Trading Balance" value={data?.data.balance[baseCurrency] ?? 0} token={baseCurrency} />
      <CurrencyRow title="Trading Balance" value={data?.data.balance[quoteCurrency] ?? 0} token={quoteCurrency} />
      <Box display="flex" gap={2} justifyItems="space-between">
        <Button variant="contained" color="secondary" fullWidth size="small" onClick={() => setDepositOpen(true)}>
          Deposit
        </Button>
        <Button variant="contained" color="secondary" fullWidth size="small">
          Withdraw
        </Button>
      </Box>
      {depositOpen && <Deposit onClose={() => setDepositOpen(false)} />}
    </Box>
  );
};
