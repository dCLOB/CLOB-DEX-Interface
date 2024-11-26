import { NewOrder, OrderSide, OrderType } from "@contracts/dex";
import { Order, OrderCreateData } from "@/api/orders/types";
import { getCurrenciesFromPair, getTokenContractId, parseUnits } from "@/utils";
import { scValToNative, xdr } from "@stellar/stellar-sdk";

export const createOrderContractData = (
  order: OrderCreateData,
  address: string,
  baseTokenDecimals: number,
  quoteTokenDecimals: number,
): {
  trading_pair: readonly [string, string];
  order_type: OrderType;
  side: OrderSide;
  order: NewOrder;
  user: string;
} => {
  const { baseCurrency, quoteCurrency } = getCurrenciesFromPair(order.pair);
  return {
    trading_pair: [getTokenContractId(baseCurrency), getTokenContractId(quoteCurrency)],
    order_type: { tag: order.type === "limit" ? "Limit" : "Market", values: undefined },
    side: { tag: order.side === "buy" ? "BUY" : "SELL", values: undefined },
    order: {
      fee_amount: 0n,
      fee_token_asset: getTokenContractId("XLM"),
      price: parseUnits(order.price, quoteTokenDecimals),
      quantity: parseUnits(order.amount, baseTokenDecimals),
    },
    user: address,
  };
};

export const getOrderBookId = (value: xdr.ScVal): Order["orderBookId"] => {
  const [result] = scValToNative(value);
  console.log("parsed result", result);
  const [tag, { id, price }] = result;
  return { tag, values: [{ id: Number(id), price: Number(price) }] };
};
