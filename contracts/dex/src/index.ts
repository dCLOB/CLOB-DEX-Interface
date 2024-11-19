import { Buffer } from "buffer";
import { Address } from '@stellar/stellar-sdk';
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  Result,
  Spec as ContractSpec,
} from '@stellar/stellar-sdk/contract';
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
} from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk'
export * as contract from '@stellar/stellar-sdk/contract'
export * as rpc from '@stellar/stellar-sdk/rpc'

if (typeof window !== 'undefined') {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CC2XEBD3OI2DIIOTNJ4OZ5BZGU2BJMGRQ47QFMYXL6FEHBHYAKPGEH5H",
  }
} as const

export const Errors = {
  1: {message:"EmptyNodeView"},

  2: {message:"ZeroValueInsert"},

  3: {message:"NotAChildOfItsParent"},

  4: {message:"NotAParentOfChild"},

  5: {message:"IncorrectPriceLevelStorageState"},

  6: {message:"InvalidOrderIndex"},

  7: {message:"SameValueStored"},

  8: {message:"AmountMustBePositive"},

  9: {message:"TokenIsNotListed"},

  10: {message:"PairNotExist"},

  11: {message:"PairAlreadyAdded"},

  12: {message:"SamePairTokens"},

  13: {message:"BalanceNotEnough"}
}
export type OrderSide = {tag: "BUY", values: void} | {tag: "SELL", values: void};

export type OrderType = {tag: "Limit", values: void} | {tag: "Market", values: void};


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

export type OrderBookId = {tag: "BuyId", values: readonly [PriceLevelId]} | {tag: "SellId", values: readonly [PriceLevelId]};


export interface PriceLevelId {
  id: u64;
  price: u128;
}


export interface OrderBook {
  buy_orders: PriceLevelStore;
  sell_orders: PriceLevelStore;
}


export interface PriceLevelStore {
  level_ids: Map<u128, u32>;
  levels: Array<PriceStore>;
}


export interface PriceStore {
  order_ids: Map<u64, u32>;
  orders: Array<Order>;
  orders_id_counter: u64;
  price: u128;
}


export interface UserBalanceManager {
  token: string;
  user: string;
}


export interface UserBalances {
  balance: i128;
  balance_in_trading: i128;
}


export interface PairManager {
  symbol: string;
}


export interface PairStorageInfo {
  status: ListingStatus;
  token1: string;
  token2: string;
}


export interface TokenManager {
  token: string;
}

export type ListingStatus = {tag: "Listed", values: void} | {tag: "Delisted", values: void};

export type FillStatus = {tag: "Complete", values: void} | {tag: "Partial", values: void} | {tag: "None", values: void};


export interface MakerFill {
  fill_amount: u128;
  fill_type: FillStatus;
  maker_order: Order;
  oix: OrderBookId;
}


export interface PendingFill {
  maker_fills: Array<MakerFill>;
  taker_fill_status: FillStatus;
  taker_order: Order;
}


export interface Client {
  /**
   * Construct and simulate a create_order transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  create_order: ({trading_pair, order_type, side, order}: {trading_pair: readonly [string, string], order_type: OrderType, side: OrderSide, order: NewOrder}, options?: {
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
  }) => Promise<AssembledTransaction<Option<OrderBookId>>>

  /**
   * Construct and simulate a cancel_order transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  cancel_order: ({trading_pair, order_id}: {trading_pair: readonly [string, string], order_id: OrderBookId}, options?: {
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
  }) => Promise<AssembledTransaction<boolean>>

  /**
   * Construct and simulate a deposit transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  deposit: ({user, token, amount}: {user: string, token: string, amount: i128}, options?: {
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
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a withdraw transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  withdraw: ({user, token, amount}: {user: string, token: string, amount: i128}, options?: {
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
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a balances transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  balances: ({user, token}: {user: string, token: string}, options?: {
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
  }) => Promise<AssembledTransaction<UserBalances>>

  /**
   * Construct and simulate a owner transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  owner: (options?: {
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
  }) => Promise<AssembledTransaction<string>>

  /**
   * Construct and simulate a fee_collector transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  fee_collector: (options?: {
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
  }) => Promise<AssembledTransaction<string>>

  /**
   * Construct and simulate a is_token_listed transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  is_token_listed: ({token}: {token: string}, options?: {
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
  }) => Promise<AssembledTransaction<boolean>>

  /**
   * Construct and simulate a is_pair_listed transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  is_pair_listed: ({symbol}: {symbol: string}, options?: {
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
  }) => Promise<AssembledTransaction<boolean>>

  /**
   * Construct and simulate a set_token_status transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_token_status: ({token, status}: {token: string, status: ListingStatus}, options?: {
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
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a set_pair_status transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_pair_status: ({symbol, token1, token2, status}: {symbol: string, token1: string, token2: string, status: ListingStatus}, options?: {
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
  }) => Promise<AssembledTransaction<null>>

}
export class Client extends ContractClient {
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAADQAAAAAAAAANRW1wdHlOb2RlVmlldwAAAAAAAAEAAAAAAAAAD1plcm9WYWx1ZUluc2VydAAAAAACAAAAAAAAABROb3RBQ2hpbGRPZkl0c1BhcmVudAAAAAMAAAAAAAAAEU5vdEFQYXJlbnRPZkNoaWxkAAAAAAAABAAAAAAAAAAfSW5jb3JyZWN0UHJpY2VMZXZlbFN0b3JhZ2VTdGF0ZQAAAAAFAAAAAAAAABFJbnZhbGlkT3JkZXJJbmRleAAAAAAAAAYAAAAAAAAAD1NhbWVWYWx1ZVN0b3JlZAAAAAAHAAAAAAAAABRBbW91bnRNdXN0QmVQb3NpdGl2ZQAAAAgAAAAAAAAAEFRva2VuSXNOb3RMaXN0ZWQAAAAJAAAAAAAAAAxQYWlyTm90RXhpc3QAAAAKAAAAAAAAABBQYWlyQWxyZWFkeUFkZGVkAAAACwAAAAAAAAAOU2FtZVBhaXJUb2tlbnMAAAAAAAwAAAAAAAAAEEJhbGFuY2VOb3RFbm91Z2gAAAAN",
        "AAAAAgAAAAAAAAAAAAAACU9yZGVyU2lkZQAAAAAAAAIAAAAAAAAAAAAAAANCVVkAAAAAAAAAAAAAAAAEU0VMTA==",
        "AAAAAgAAAAAAAAAAAAAACU9yZGVyVHlwZQAAAAAAAAIAAAAAAAAAAAAAAAVMaW1pdAAAAAAAAAAAAAAAAAAABk1hcmtldAAA",
        "AAAAAQAAAAAAAAAAAAAABU9yZGVyAAAAAAAABgAAAAAAAAAHYWNjb3VudAAAAAATAAAAAAAAAApmZWVfYW1vdW50AAAAAAAKAAAAAAAAAA9mZWVfdG9rZW5fYXNzZXQAAAAAEwAAAAAAAAAIb3JkZXJfaWQAAAAGAAAAAAAAAAVwcmljZQAAAAAAAAoAAAAAAAAACHF1YW50aXR5AAAACg==",
        "AAAAAQAAAAAAAAAAAAAACE5ld09yZGVyAAAABAAAAAAAAAAKZmVlX2Ftb3VudAAAAAAACgAAAAAAAAAPZmVlX3Rva2VuX2Fzc2V0AAAAABMAAAAAAAAABXByaWNlAAAAAAAACgAAAAAAAAAIcXVhbnRpdHkAAAAK",
        "AAAAAgAAAAAAAAAAAAAAC09yZGVyQm9va0lkAAAAAAIAAAABAAAAAAAAAAVCdXlJZAAAAAAAAAEAAAfQAAAADFByaWNlTGV2ZWxJZAAAAAEAAAAAAAAABlNlbGxJZAAAAAAAAQAAB9AAAAAMUHJpY2VMZXZlbElk",
        "AAAAAQAAAAAAAAAAAAAADFByaWNlTGV2ZWxJZAAAAAIAAAAAAAAAAmlkAAAAAAAGAAAAAAAAAAVwcmljZQAAAAAAAAo=",
        "AAAAAQAAAAAAAAAAAAAACU9yZGVyQm9vawAAAAAAAAIAAAAAAAAACmJ1eV9vcmRlcnMAAAAAB9AAAAAPUHJpY2VMZXZlbFN0b3JlAAAAAAAAAAALc2VsbF9vcmRlcnMAAAAH0AAAAA9QcmljZUxldmVsU3RvcmUA",
        "AAAAAQAAAAAAAAAAAAAAD1ByaWNlTGV2ZWxTdG9yZQAAAAACAAAAAAAAAAlsZXZlbF9pZHMAAAAAAAPsAAAACgAAAAQAAAAAAAAABmxldmVscwAAAAAD6gAAB9AAAAAKUHJpY2VTdG9yZQAA",
        "AAAAAQAAAAAAAAAAAAAAClByaWNlU3RvcmUAAAAAAAQAAAAAAAAACW9yZGVyX2lkcwAAAAAAA+wAAAAGAAAABAAAAAAAAAAGb3JkZXJzAAAAAAPqAAAH0AAAAAVPcmRlcgAAAAAAAAAAAAARb3JkZXJzX2lkX2NvdW50ZXIAAAAAAAAGAAAAAAAAAAVwcmljZQAAAAAAAAo=",
        "AAAAAQAAAAAAAAAAAAAAElVzZXJCYWxhbmNlTWFuYWdlcgAAAAAAAgAAAAAAAAAFdG9rZW4AAAAAAAATAAAAAAAAAAR1c2VyAAAAEw==",
        "AAAAAQAAAAAAAAAAAAAADFVzZXJCYWxhbmNlcwAAAAIAAAAAAAAAB2JhbGFuY2UAAAAACwAAAAAAAAASYmFsYW5jZV9pbl90cmFkaW5nAAAAAAAL",
        "AAAAAQAAAAAAAAAAAAAAC1BhaXJNYW5hZ2VyAAAAAAEAAAAAAAAABnN5bWJvbAAAAAAAEA==",
        "AAAAAQAAAAAAAAAAAAAAD1BhaXJTdG9yYWdlSW5mbwAAAAADAAAAAAAAAAZzdGF0dXMAAAAAB9AAAAANTGlzdGluZ1N0YXR1cwAAAAAAAAAAAAAGdG9rZW4xAAAAAAATAAAAAAAAAAZ0b2tlbjIAAAAAABM=",
        "AAAAAQAAAAAAAAAAAAAADFRva2VuTWFuYWdlcgAAAAEAAAAAAAAABXRva2VuAAAAAAAAEw==",
        "AAAAAgAAAAAAAAAAAAAADUxpc3RpbmdTdGF0dXMAAAAAAAACAAAAAAAAAAAAAAAGTGlzdGVkAAAAAAAAAAAAAAAAAAhEZWxpc3RlZA==",
        "AAAAAgAAAAAAAAAAAAAACkZpbGxTdGF0dXMAAAAAAAMAAAAAAAAAAAAAAAhDb21wbGV0ZQAAAAAAAAAAAAAAB1BhcnRpYWwAAAAAAAAAAAAAAAAETm9uZQ==",
        "AAAAAQAAAAAAAAAAAAAACU1ha2VyRmlsbAAAAAAAAAQAAAAAAAAAC2ZpbGxfYW1vdW50AAAAAAoAAAAAAAAACWZpbGxfdHlwZQAAAAAAB9AAAAAKRmlsbFN0YXR1cwAAAAAAAAAAAAttYWtlcl9vcmRlcgAAAAfQAAAABU9yZGVyAAAAAAAAAAAAAANvaXgAAAAH0AAAAAtPcmRlckJvb2tJZAA=",
        "AAAAAQAAAAAAAAAAAAAAC1BlbmRpbmdGaWxsAAAAAAMAAAAAAAAAC21ha2VyX2ZpbGxzAAAAA+oAAAfQAAAACU1ha2VyRmlsbAAAAAAAAAAAAAARdGFrZXJfZmlsbF9zdGF0dXMAAAAAAAfQAAAACkZpbGxTdGF0dXMAAAAAAAAAAAALdGFrZXJfb3JkZXIAAAAH0AAAAAVPcmRlcgAAAA==",
        "AAAAAAAAAAAAAAAMY3JlYXRlX29yZGVyAAAABAAAAAAAAAAMdHJhZGluZ19wYWlyAAAD7QAAAAIAAAATAAAAEwAAAAAAAAAKb3JkZXJfdHlwZQAAAAAH0AAAAAlPcmRlclR5cGUAAAAAAAAAAAAABHNpZGUAAAfQAAAACU9yZGVyU2lkZQAAAAAAAAAAAAAFb3JkZXIAAAAAAAfQAAAACE5ld09yZGVyAAAAAQAAA+gAAAfQAAAAC09yZGVyQm9va0lkAA==",
        "AAAAAAAAAAAAAAAMY2FuY2VsX29yZGVyAAAAAgAAAAAAAAAMdHJhZGluZ19wYWlyAAAD7QAAAAIAAAATAAAAEwAAAAAAAAAIb3JkZXJfaWQAAAfQAAAAC09yZGVyQm9va0lkAAAAAAEAAAAB",
        "AAAAAAAAAAAAAAAHZGVwb3NpdAAAAAADAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAAFdG9rZW4AAAAAAAATAAAAAAAAAAZhbW91bnQAAAAAAAsAAAAA",
        "AAAAAAAAAAAAAAAId2l0aGRyYXcAAAADAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAAFdG9rZW4AAAAAAAATAAAAAAAAAAZhbW91bnQAAAAAAAsAAAAA",
        "AAAAAAAAAAAAAAAIYmFsYW5jZXMAAAACAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAAFdG9rZW4AAAAAAAATAAAAAQAAB9AAAAAMVXNlckJhbGFuY2Vz",
        "AAAAAAAAAAAAAAAFb3duZXIAAAAAAAAAAAAAAQAAABM=",
        "AAAAAAAAAAAAAAANZmVlX2NvbGxlY3RvcgAAAAAAAAAAAAABAAAAEw==",
        "AAAAAAAAAAAAAAAPaXNfdG9rZW5fbGlzdGVkAAAAAAEAAAAAAAAABXRva2VuAAAAAAAAEwAAAAEAAAAB",
        "AAAAAAAAAAAAAAAOaXNfcGFpcl9saXN0ZWQAAAAAAAEAAAAAAAAABnN5bWJvbAAAAAAAEAAAAAEAAAAB",
        "AAAAAAAAAAAAAAAQc2V0X3Rva2VuX3N0YXR1cwAAAAIAAAAAAAAABXRva2VuAAAAAAAAEwAAAAAAAAAGc3RhdHVzAAAAAAfQAAAADUxpc3RpbmdTdGF0dXMAAAAAAAAA",
        "AAAAAAAAAAAAAAAPc2V0X3BhaXJfc3RhdHVzAAAAAAQAAAAAAAAABnN5bWJvbAAAAAAAEAAAAAAAAAAGdG9rZW4xAAAAAAATAAAAAAAAAAZ0b2tlbjIAAAAAABMAAAAAAAAABnN0YXR1cwAAAAAH0AAAAA1MaXN0aW5nU3RhdHVzAAAAAAAAAA==" ]),
      options
    )
  }
  public readonly fromJSON = {
    create_order: this.txFromJSON<Option<OrderBookId>>,
        cancel_order: this.txFromJSON<boolean>,
        deposit: this.txFromJSON<null>,
        withdraw: this.txFromJSON<null>,
        balances: this.txFromJSON<UserBalances>,
        owner: this.txFromJSON<string>,
        fee_collector: this.txFromJSON<string>,
        is_token_listed: this.txFromJSON<boolean>,
        is_pair_listed: this.txFromJSON<boolean>,
        set_token_status: this.txFromJSON<null>,
        set_pair_status: this.txFromJSON<null>
  }
}