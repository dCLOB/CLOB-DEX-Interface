import { Box, Card, TableCell, Typography, IconButton } from "@mui/material";
import { ITableColumn, Table } from "@/components/Table";
import { useCancelOrder, useGetOpenOrders } from "@/api/orders";
import { Order } from "@/api/orders/types";
import { useCallback } from "react";
import { getCurrenciesFromPair } from "@/utils";
import { formatDecimal } from "@/utils/formatters/number";
import { formatPair, getOrderStatusColor, getOrderStatusLabel } from "@/components/Orders/utils";
import { formatDateTime } from "@/utils/formatters/date";
import CancelIcon from "@mui/icons-material/Cancel";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

const COLUMNS: ITableColumn[] = [
  { name: "Pair" },
  { name: "Type" },
  { name: "Amount", align: "right" },
  { name: "Filled", align: "right" },
  { name: "Price", align: "right" },
  { name: "Status" },
  { name: "Placed" },
  { name: "Action" },
];

const OrderRow = ({ row }: { row: Order }) => {
  const { baseCurrency, quoteCurrency } = getCurrenciesFromPair(row.pair);

  const { mutateAsync: cancelOrder } = useCancelOrder();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const handleCancel = async () => {
    await cancelOrder(row.id);
    enqueueSnackbar("Order canceled", { variant: "success" });
    queryClient.refetchQueries({ queryKey: ["orders"] });
    // TODO refetch order history
    queryClient.refetchQueries({ queryKey: ["balance"] });
  };

  return (
    <>
      <TableCell>
        <Typography variant="caption" color={row.side === "buy" ? "success" : "error"}>
          {formatPair(row.pair)}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="caption" textTransform="capitalize">
          {row.type}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="caption">
          {formatDecimal(row.amount)} {baseCurrency}
        </Typography>
      </TableCell>

      <TableCell align="right">
        <Typography variant="caption">
          {formatDecimal(row.filled)} {baseCurrency}
        </Typography>
      </TableCell>

      <TableCell align="right">
        <Typography variant="caption">
          {row.type === "market" ? "-" : `${formatDecimal(row.price)} ${quoteCurrency}`}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="caption" color={getOrderStatusColor(row.status)}>
          {getOrderStatusLabel(row.status)}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="caption">{formatDateTime(row.createdAt)}</Typography>
      </TableCell>

      <TableCell>
        <IconButton size="small" onClick={handleCancel}>
          <CancelIcon />
        </IconButton>
      </TableCell>
    </>
  );
};

export const OpenOrders = () => {
  const { data } = useGetOpenOrders();

  const orders = data?.data ?? [];

  const renderRow = useCallback((row: Order) => <OrderRow row={row} />, []);

  return (
    <Card variant="outlined" sx={{ flex: 1 }}>
      <Box display="flex" flexDirection="column" justifyContent="space-between" gap={3} height="100%" padding={2}>
        <Table columns={COLUMNS} rows={orders} renderRow={renderRow} />
      </Box>
    </Card>
  );
};
