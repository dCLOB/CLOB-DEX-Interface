import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  Result,
} from "@stellar/stellar-sdk/contract";
import type { u32, u64, u128, i128, Option } from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";
export declare const networks: {
  readonly testnet: {
    readonly networkPassphrase: "Test SDF Network ; September 2015";
    readonly contractId: "CBE2QUQM4G4HKN3HOR2UF4M6MGGKJ472DZBBRFWD6QBIF7J325DIVX4E";
  };
};
export declare const Errors: {
  1: {
    message: string;
  };
  2: {
    message: string;
  };
  3: {
    message: string;
  };
  4: {
    message: string;
  };
  5: {
    message: string;
  };
  6: {
    message: string;
  };
  7: {
    message: string;
  };
  8: {
    message: string;
  };
  9: {
    message: string;
  };
  10: {
    message: string;
  };
  11: {
    message: string;
  };
  12: {
    message: string;
  };
};
export type OrderSide =
  | {
      tag: "BUY";
      values: void;
    }
  | {
      tag: "SELL";
      values: void;
    };
export type OrderType =
  | {
      tag: "Limit";
      values: void;
    }
  | {
      tag: "Market";
      values: void;
    };
export interface Order {
  account: string;
  fee_amount: u128;
  fee_token_asset: string;
  order_id: u64;
  price: u128;
  quantity: u128;
}
export interface NewOrder {
  fee_amount: u128;
  fee_token_asset: string;
  price: u128;
  quantity: u128;
}
export interface NewAccountOrder {
  account: string;
  fee_amount: u128;
  fee_token_asset: string;
  price: u128;
  quantity: u128;
}
export type OrderBookId =
  | {
      tag: "BuyId";
      values: readonly [PriceLevelId];
    }
  | {
      tag: "SellId";
      values: readonly [PriceLevelId];
    };
export interface PriceLevelId {
  id: u64;
  price: u128;
}
export interface OrderBook {
  buy_orders: PriceLevelStore;
  sell_orders: PriceLevelStore;
}
export interface PriceLevelStore {
  levels: Array<Option<PriceStore>>;
  levels_price: Array<Option<u128>>;
}
export interface PriceStore {
  order_ids: Map<u64, u32>;
  orders: Array<Option<Order>>;
  orders_id_counter: u64;
  price: u128;
}
export type FillStatus =
  | {
      tag: "Complete";
      values: void;
    }
  | {
      tag: "Partial";
      values: void;
    }
  | {
      tag: "None";
      values: void;
    };
export interface MakerFill {
  fill_amount: u128;
  fill_type: FillStatus;
  maker_order: Order;
  oix: OrderBookId;
}
export interface PendingFill {
  maker_fills: Array<MakerFill>;
  taker_fill_status: FillStatus;
  taker_order: NewOrder;
}
export interface UserBalanceManager {
  token: string;
  user: string;
}
export interface UserBalances {
  balance: i128;
  balance_in_trading: i128;
}
export interface Client {
  /**
   * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  initialize: (
    {
      token_pairs,
    }: {
      token_pairs: Array<readonly [string, string]>;
    },
    options?: {
      /**
       * The fee to pay for the transaction. Default: BASE_FEE
       */
      fee?: number;
      /**
       * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
       */
      timeoutInSeconds?: number;
      /**
       * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
       */
      simulate?: boolean;
    },
  ) => Promise<AssembledTransaction<null>>;
  /**
   * Construct and simulate a create_order transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  create_order: (
    {
      trading_pair,
      order_type,
      side,
      order,
      user,
    }: {
      trading_pair: readonly [string, string];
      order_type: OrderType;
      side: OrderSide;
      order: NewOrder;
      user: string;
    },
    options?: {
      /**
       * The fee to pay for the transaction. Default: BASE_FEE
       */
      fee?: number;
      /**
       * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
       */
      timeoutInSeconds?: number;
      /**
       * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
       */
      simulate?: boolean;
    },
  ) => Promise<AssembledTransaction<Result<readonly [OrderBookId, Array<Order>]>>>;
  /**
   * Construct and simulate a cancel_order transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  cancel_order: (
    {
      trading_pair,
      order_id,
      user,
    }: {
      trading_pair: readonly [string, string];
      order_id: OrderBookId;
      user: string;
    },
    options?: {
      /**
       * The fee to pay for the transaction. Default: BASE_FEE
       */
      fee?: number;
      /**
       * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
       */
      timeoutInSeconds?: number;
      /**
       * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
       */
      simulate?: boolean;
    },
  ) => Promise<AssembledTransaction<Result<Order>>>;
  /**
   * Construct and simulate a deposit transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  deposit: (
    {
      user,
      token,
      amount,
    }: {
      user: string;
      token: string;
      amount: i128;
    },
    options?: {
      /**
       * The fee to pay for the transaction. Default: BASE_FEE
       */
      fee?: number;
      /**
       * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
       */
      timeoutInSeconds?: number;
      /**
       * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
       */
      simulate?: boolean;
    },
  ) => Promise<AssembledTransaction<null>>;
  /**
   * Construct and simulate a withdraw transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  withdraw: (
    {
      user,
      token,
      amount,
    }: {
      user: string;
      token: string;
      amount: i128;
    },
    options?: {
      /**
       * The fee to pay for the transaction. Default: BASE_FEE
       */
      fee?: number;
      /**
       * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
       */
      timeoutInSeconds?: number;
      /**
       * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
       */
      simulate?: boolean;
    },
  ) => Promise<AssembledTransaction<null>>;
  /**
   * Construct and simulate a balances transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  balances: (
    {
      user,
      token,
    }: {
      user: string;
      token: string;
    },
    options?: {
      /**
       * The fee to pay for the transaction. Default: BASE_FEE
       */
      fee?: number;
      /**
       * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
       */
      timeoutInSeconds?: number;
      /**
       * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
       */
      simulate?: boolean;
    },
  ) => Promise<AssembledTransaction<UserBalances>>;
}
export declare class Client extends ContractClient {
  readonly options: ContractClientOptions;
  constructor(options: ContractClientOptions);
  readonly fromJSON: {
    initialize: (json: string) => AssembledTransaction<null>;
    create_order: (
      json: string,
    ) => AssembledTransaction<
      Result<readonly [OrderBookId, Order[]], import("@stellar/stellar-sdk/contract").ErrorMessage>
    >;
    cancel_order: (
      json: string,
    ) => AssembledTransaction<Result<Order, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
    deposit: (json: string) => AssembledTransaction<null>;
    withdraw: (json: string) => AssembledTransaction<null>;
    balances: (json: string) => AssembledTransaction<UserBalances>;
  };
}
