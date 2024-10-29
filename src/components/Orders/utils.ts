import { OrderStatus } from "@/api/orders/types";

export const formatPair = (pair: string) => pair.replace("-", "/");

const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  open: "Open",
  partiallyFilled: "Partially filled",
  filled: "Filled",
  canceled: "Canceled",
};

export const getOrderStatusLabel = (status: OrderStatus) => ORDER_STATUS_LABELS[status];

const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  open: "textPrimary",
  partiallyFilled: "warning",
  filled: "success",
  canceled: "error",
};

export const getOrderStatusColor = (status: OrderStatus) => ORDER_STATUS_COLORS[status];
