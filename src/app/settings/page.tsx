"use client";
import { Box, Button, Typography } from "@mui/material";
import { useDexContract } from "@/hooks/useDexContract";
import { getCurrenciesFromPair, getTokenContractId } from "@/utils";
import { TRADING_PAIRS } from "@/constants";
import { useReset } from "@/api/reset";
import { useSnackbar } from "notistack";

export default function SettingsPage() {
  const { enqueueSnackbar } = useSnackbar();

  const dexContract = useDexContract();

  const handleInitialize = async () => {
    try {
      const tx = await dexContract.initialize({
        token_pairs: TRADING_PAIRS.map((pair) => {
          const { baseCurrency, quoteCurrency } = getCurrenciesFromPair(pair);
          return [getTokenContractId(baseCurrency), getTokenContractId(quoteCurrency)];
        }),
      });
      const result = await tx.signAndSend();
      console.log("initialize result", result);
      enqueueSnackbar("Successfully initialized", { variant: "success" });
    } catch (e) {
      console.error(e);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  const { mutateAsync: resetState } = useReset();

  const handleReset = async () => {
    try {
      const result = await resetState();
      console.log("reset result", result);
      enqueueSnackbar("Reset state is completed", { variant: "success" });
    } catch (e) {
      console.error(e);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  return (
    <Box padding={6} display="flex" flexDirection="column" gap={4}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="subtitle1">Initialize Pairs</Typography>
        <Typography variant="body2">
          Initialize Pairs for trading or reset current orders state for initialized pairs
        </Typography>
        <Button variant="outlined" onClick={handleInitialize} sx={{ width: 200 }}>
          INITIALIZE PAIRS
        </Button>
      </Box>

      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="subtitle1">Reset State</Typography>
        <Typography variant="body2">Reset app current state</Typography>
        <Button variant="outlined" onClick={handleReset} sx={{ width: 200 }}>
          RESET STATE
        </Button>
      </Box>
    </Box>
  );
}
