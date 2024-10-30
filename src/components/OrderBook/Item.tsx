import { OrderbookItem } from "@/api/orderbook/types";
import { Box, Typography } from "@mui/material";
import { formatDecimal } from "@/utils/formatters/number";
import { Order } from "@/api/orders/types";

export const Item = ({ item, side }: { item: OrderbookItem; side: Order["side"] }) => {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
      <Typography variant="caption" fontWeight="bold" color={side === "buy" ? "success" : "error"} lineHeight={1.5}>
        {formatDecimal(item.price)}
      </Typography>
      <Typography variant="caption" fontWeight="bold" textAlign="right" lineHeight={1.5}>
        {formatDecimal(item.amount)}
      </Typography>
      <Typography variant="caption" fontWeight="bold" textAlign="right" lineHeight={1.5}>
        {formatDecimal(item.total)}
      </Typography>
    </Box>
  );
};
