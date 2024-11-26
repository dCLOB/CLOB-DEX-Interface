import { Box, Card, TableCell, Typography, IconButton } from "@mui/material";
import { ITableColumn, Table } from "@/components/Table";
import { useCancelOrder, useGetOpenOrders } from "@/api/orders";
import { Order } from "@/api/orders/types";
import { useCallback, useState } from "react";
import { getCurrenciesFromPair, getTokenContractId } from "@/utils";
import { formatDecimal } from "@/utils/formatters/number";
import { formatPair, getOrderStatusColor, getOrderStatusLabel } from "@/components/Orders/utils";
import { formatDateTime } from "@/utils/formatters/date";
import CancelIcon from "@mui/icons-material/Cancel";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useDexContract } from "@/hooks/useDexContract";
import { useFreighterContext } from "@/providers/FreighterProvider";
import { OrderBookId } from "@contracts/dex";

const COLUMNS: ITableColumn[] = [
  { name: "Pair" },
  { name: "Type" },
  { name: "Amount", align: "right" },
  { name: "Filled", align: "right" },
  { name: "Price", align: "right" },
  { name: "Status" },
  { name: "Placed" },
  { name: "" },
];

const OrderRow = ({ row }: { row: Order }) => {
  const [loading, setLoading] = useState(false);
  const { baseCurrency, quoteCurrency } = getCurrenciesFromPair(row.pair);

  const { address } = useFreighterContext();

  const dexContract = useDexContract();

  const { mutateAsync: cancelOrder } = useCancelOrder();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const handleCancel = async () => {
    if (loading) return; // skip if prev cancel is running
    try {
      setLoading(true);
      // TODO
      if (row.orderBookId) {
        const priceLevelId = row.orderBookId.values[0];
        const data = {
          trading_pair: [getTokenContractId(baseCurrency), getTokenContractId(quoteCurrency)] as readonly [
            string,
            string,
          ],
          order_id: {
            tag: row.orderBookId.tag,
            values: [{ id: BigInt(priceLevelId.id), price: BigInt(priceLevelId.price) }],
          } as OrderBookId,
          user: address as string,
        };
        const tx = await dexContract.cancel_order(data);
        const result = await tx.signAndSend();
        console.log("cancel call result: ", result);
      }
      // TODO
      await cancelOrder(row.id);
      enqueueSnackbar("Order canceled", { variant: "success" });
      queryClient.refetchQueries({ queryKey: ["orders"] });
      queryClient.refetchQueries({ queryKey: ["order-history"] });
      queryClient.refetchQueries({ queryKey: ["balance"] });
    } catch (e) {
      console.error(e);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    } finally {
      setLoading(false);
    }
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

      <TableCell align="right">
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

      <TableCell align="right">
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
