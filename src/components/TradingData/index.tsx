import { useGetMarkets } from "@/api/markets";
import { Box, Card, Typography } from "@mui/material";
import { TradingDataValue } from "./TradingDataValue";
import { formatDecimal } from "@/utils/formatters/number";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { PairDropdown } from "@/components/TradingData/PairDropdown";
import usePairStore from "@/stores/pair";
import { getCurrenciesFromPair } from "@/utils";

export const TradingData = () => {
  const { data } = useGetMarkets();

  const pair = usePairStore((state) => state.pair);

  const activePair = data?.data.find((market) => market.id === pair);

  const isPositive = activePair && activePair.priceChange >= 0;
  const color = isPositive ? "success" : "error";
  const { baseCurrency, quoteCurrency } = getCurrenciesFromPair(activePair?.id);

  return (
    <Card variant="outlined" sx={{ height: 76 }}>
      {activePair && (
        <Box display="flex" alignItems="center" gap={3} height="100%" padding={2}>
          <PairDropdown />

          <Box display="flex" alignItems="center" gap={0.5} height="100%">
            {isPositive ? <TrendingUpIcon color={color} /> : <TrendingDownIcon color={color} />}
            <Typography variant="h6" color={color} fontWeight="bold">
              {formatDecimal(activePair.lastPrice)}
            </Typography>
          </Box>

          <TradingDataValue title="24h Change">
            <Typography variant="body2" color={color} fontWeight="bold">
              {isPositive && "+"}
              {formatDecimal(activePair.priceChange * 100)}%
            </Typography>
          </TradingDataValue>

          <TradingDataValue title="24h Low">{formatDecimal(activePair.lowestPrice)}</TradingDataValue>

          <TradingDataValue title="24h High">{formatDecimal(activePair.highestPrice)}</TradingDataValue>

          <TradingDataValue title={`24h Volume (${baseCurrency})`}>
            {formatDecimal(activePair.baseVolume)}
          </TradingDataValue>

          <TradingDataValue title={`24h Volume (${quoteCurrency})`}>
            {formatDecimal(activePair.quoteVolume)}
          </TradingDataValue>
        </Box>
      )}
    </Card>
  );
};
