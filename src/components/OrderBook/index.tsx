import { Box, Card, Typography } from "@mui/material";
import usePairStore from "@/stores/pair";
import { getCurrenciesFromPair } from "@/utils";
import { useGetOrderbook } from "@/api/orderbook";
import { formatDecimal } from "@/utils/formatters/number";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { useGetMarkets } from "@/api/markets";
import { OrderbookItem } from "@/api/orderbook/types";
import { Item } from "@/components/OrderBook/Item";

const getOrderbookItems = (items: OrderbookItem[] = []) =>
  items.concat(Array(5 - items.length).fill({ price: 0, amount: 0, total: 0 }));

export const OrderBook = () => {
  const pair = usePairStore((state) => state.pair);

  const { baseCurrency, quoteCurrency } = getCurrenciesFromPair(pair);

  const { data: orderBookData } = useGetOrderbook();
  const { data: marketsData } = useGetMarkets();

  const activePair = marketsData?.data.find((market) => market.id === pair);

  const isPositive = activePair && activePair.priceChange >= 0;
  const color = isPositive ? "success" : "error";

  const sellItems = getOrderbookItems(orderBookData?.data.sell);
  const buyItems = getOrderbookItems(orderBookData?.data.buy);

  return (
    <Card variant="outlined" sx={{ flex: "0 1 300px" }}>
      <Box display="flex" flexDirection="column" gap={0.75} padding={2} justifyContent="space-between">
        <Typography variant="body2" fontWeight="bold" color="textSecondary">
          Order Book
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
          <Typography variant="caption" fontWeight="bold">
            Price{" "}
            <Typography variant="caption" fontWeight="bold" color="textSecondary">
              {quoteCurrency}
            </Typography>
          </Typography>
          <Typography variant="caption" fontWeight="bold" textAlign="right">
            Amount{" "}
            <Typography variant="caption" fontWeight="bold" color="textSecondary">
              {baseCurrency}
            </Typography>
          </Typography>
          <Typography variant="caption" fontWeight="bold" textAlign="right">
            Total{" "}
            <Typography variant="caption" fontWeight="bold" color="textSecondary">
              {quoteCurrency}
            </Typography>
          </Typography>
        </Box>

        <Box sx={{ height: 90 }}>
          {sellItems.map((orderBookItem, index) => (
            <Item item={orderBookItem} key={index} side="sell" />
          ))}
        </Box>

        <Box display="flex" alignItems="center" gap={0.5} height="100%">
          {isPositive ? (
            <TrendingUpIcon color={color} fontSize="small" />
          ) : (
            <TrendingDownIcon color={color} fontSize="small" />
          )}
          <Typography variant="body2" color={color} fontWeight="bold">
            {formatDecimal(activePair?.lastPrice ?? 0)}
          </Typography>
        </Box>

        <Box sx={{ height: 90 }}>
          {buyItems.map((orderBookItem, index) => (
            <Item item={orderBookItem} key={index} side="buy" />
          ))}
        </Box>
      </Box>
    </Card>
  );
};
