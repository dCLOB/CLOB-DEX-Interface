import { Buffer } from "buffer";
import { Address } from "@stellar/stellar-sdk";
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  Result,
  Spec as ContractSpec,
} from "@stellar/stellar-sdk/contract";
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Typepoint,
  Duration,
} from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";

if (typeof window !== "undefined") {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}

export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CDUXDVFU3J3J4DHCX4MOJRUX5YO3QLBXCJFLRLGWZ6ACVL76JQUG5TTL",
  },
} as const;

export const Errors = {
  1: { message: "IncorrectPriceLevelStorageState" },

  2: { message: "InvalidOrderId" },

  3: { message: "SameValueStored" },

  4: { message: "AmountMustBePositive" },

  5: { message: "SamePairTokens" },

  6: { message: "BalanceNotEnough" },

  7: { message: "OrderNotFound" },

  8: { message: "IncorrectPrecisionCalculation" },

  9: { message: "InvalidIdFailedToRemove" },

  10: { message: "InvalidIdFailedToUpdate" },

  11: { message: "InvalidIdFailedToLoad" },

  12: { message: "PriceStoreInvalidIndex" },

  13: { message: "PriceStoreOrderNotFoundByIndex" },

  14: { message: "LevelsStorePriceNotFound" },

  15: { message: "LevelsStoreLevelNotFound" },

  16: { message: "LevelsStoreRemoveFailed" },

  17: { message: "OrderBookNotFound" },
};
export type OrderSide = { tag: "BUY"; values: void } | { tag: "SELL"; values: void };

export type OrderType = { tag: "Limit"; values: void } | { tag: "Market"; values: void };

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
  | { tag: "BuyId"; values: readonly [PriceLevelId] }
  | { tag: "SellId"; values: readonly [PriceLevelId] };

export interface PriceLevelId {
  id: u64;
  price: u128;
}

export interface OrderBook {
  buy_orders: PriceLevelStore;
  sell_orders: PriceLevelStore;
}

export interface PriceLevelStore {
  levels: Array<PriceStore>;
  levels_price: Array<u128>;
}

export interface PriceStore {
  order_ids: Map<u64, u32>;
  orders: Array<Option<Order>>;
  orders_id_counter: u64;
  price: u128;
}

export type FillStatus =
  | { tag: "Complete"; values: void }
  | { tag: "Partial"; values: void }
  | { tag: "None"; values: void };

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
    { token_pairs }: { token_pairs: Array<readonly [string, string]> },
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
    { trading_pair, order_id, user }: { trading_pair: readonly [string, string]; order_id: OrderBookId; user: string },
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
    { user, token, amount }: { user: string; token: string; amount: i128 },
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
    { user, token, amount }: { user: string; token: string; amount: i128 },
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
    { user, token }: { user: string; token: string },
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

  /**
   * Construct and simulate a upgrade transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  upgrade: (
    { new_wasm_hash }: { new_wasm_hash: Buffer },
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
}
export class Client extends ContractClient {
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([
        "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAAEQAAAAAAAAAfSW5jb3JyZWN0UHJpY2VMZXZlbFN0b3JhZ2VTdGF0ZQAAAAABAAAAAAAAAA5JbnZhbGlkT3JkZXJJZAAAAAAAAgAAAAAAAAAPU2FtZVZhbHVlU3RvcmVkAAAAAAMAAAAAAAAAFEFtb3VudE11c3RCZVBvc2l0aXZlAAAABAAAAAAAAAAOU2FtZVBhaXJUb2tlbnMAAAAAAAUAAAAAAAAAEEJhbGFuY2VOb3RFbm91Z2gAAAAGAAAAAAAAAA1PcmRlck5vdEZvdW5kAAAAAAAABwAAAAAAAAAdSW5jb3JyZWN0UHJlY2lzaW9uQ2FsY3VsYXRpb24AAAAAAAAIAAAAAAAAABdJbnZhbGlkSWRGYWlsZWRUb1JlbW92ZQAAAAAJAAAAAAAAABdJbnZhbGlkSWRGYWlsZWRUb1VwZGF0ZQAAAAAKAAAAAAAAABVJbnZhbGlkSWRGYWlsZWRUb0xvYWQAAAAAAAALAAAAAAAAABZQcmljZVN0b3JlSW52YWxpZEluZGV4AAAAAAAMAAAAAAAAAB5QcmljZVN0b3JlT3JkZXJOb3RGb3VuZEJ5SW5kZXgAAAAAAA0AAAAAAAAAGExldmVsc1N0b3JlUHJpY2VOb3RGb3VuZAAAAA4AAAAAAAAAGExldmVsc1N0b3JlTGV2ZWxOb3RGb3VuZAAAAA8AAAAAAAAAF0xldmVsc1N0b3JlUmVtb3ZlRmFpbGVkAAAAABAAAAAAAAAAEU9yZGVyQm9va05vdEZvdW5kAAAAAAAAEQ==",
        "AAAAAgAAAAAAAAAAAAAACU9yZGVyU2lkZQAAAAAAAAIAAAAAAAAAAAAAAANCVVkAAAAAAAAAAAAAAAAEU0VMTA==",
        "AAAAAgAAAAAAAAAAAAAACU9yZGVyVHlwZQAAAAAAAAIAAAAAAAAAAAAAAAVMaW1pdAAAAAAAAAAAAAAAAAAABk1hcmtldAAA",
        "AAAAAQAAAAAAAAAAAAAABU9yZGVyAAAAAAAABgAAAAAAAAAHYWNjb3VudAAAAAATAAAAAAAAAApmZWVfYW1vdW50AAAAAAAKAAAAAAAAAA9mZWVfdG9rZW5fYXNzZXQAAAAAEwAAAAAAAAAIb3JkZXJfaWQAAAAGAAAAAAAAAAVwcmljZQAAAAAAAAoAAAAAAAAACHF1YW50aXR5AAAACg==",
        "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",
      ]),
      options,
    );
  }
  public readonly fromJSON = {
    initialize: this.txFromJSON<null>,
    create_order: this.txFromJSON<Result<readonly [OrderBookId, Array<Order>]>>,
    cancel_order: this.txFromJSON<Result<Order>>,
    deposit: this.txFromJSON<null>,
    withdraw: this.txFromJSON<null>,
    balances: this.txFromJSON<UserBalances>,
    upgrade: this.txFromJSON<null>,
  };
}
