import { AssembledTransaction, Client as ContractClient, ClientOptions as ContractClientOptions } from '@stellar/stellar-sdk/contract';
import type { u32, u64, u128, i128, Option } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
export declare const networks: {
    readonly testnet: {
        readonly networkPassphrase: "Test SDF Network ; September 2015";
        readonly contractId: "CC2XEBD3OI2DIIOTNJ4OZ5BZGU2BJMGRQ47QFMYXL6FEHBHYAKPGEH5H";
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
    13: {
        message: string;
    };
};
export type OrderSide = {
    tag: "BUY";
    values: void;
} | {
    tag: "SELL";
    values: void;
};
export type OrderType = {
    tag: "Limit";
    values: void;
} | {
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
export type OrderBookId = {
    tag: "BuyId";
    values: readonly [PriceLevelId];
} | {
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
export type ListingStatus = {
    tag: "Listed";
    values: void;
} | {
    tag: "Delisted";
    values: void;
};
export type FillStatus = {
    tag: "Complete";
    values: void;
} | {
    tag: "Partial";
    values: void;
} | {
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
    taker_order: Order;
}
export interface Client {
    /**
     * Construct and simulate a create_order transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    create_order: ({ trading_pair, order_type, side, order }: {
        trading_pair: readonly [string, string];
        order_type: OrderType;
        side: OrderSide;
        order: NewOrder;
    }, options?: {
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
    }) => Promise<AssembledTransaction<Option<OrderBookId>>>;
    /**
     * Construct and simulate a cancel_order transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    cancel_order: ({ trading_pair, order_id }: {
        trading_pair: readonly [string, string];
        order_id: OrderBookId;
    }, options?: {
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
    }) => Promise<AssembledTransaction<boolean>>;
    /**
     * Construct and simulate a deposit transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    deposit: ({ user, token, amount }: {
        user: string;
        token: string;
        amount: i128;
    }, options?: {
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
    }) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a withdraw transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    withdraw: ({ user, token, amount }: {
        user: string;
        token: string;
        amount: i128;
    }, options?: {
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
    }) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a balances transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    balances: ({ user, token }: {
        user: string;
        token: string;
    }, options?: {
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
    }) => Promise<AssembledTransaction<UserBalances>>;
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
    }) => Promise<AssembledTransaction<string>>;
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
    }) => Promise<AssembledTransaction<string>>;
    /**
     * Construct and simulate a is_token_listed transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    is_token_listed: ({ token }: {
        token: string;
    }, options?: {
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
    }) => Promise<AssembledTransaction<boolean>>;
    /**
     * Construct and simulate a is_pair_listed transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    is_pair_listed: ({ symbol }: {
        symbol: string;
    }, options?: {
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
    }) => Promise<AssembledTransaction<boolean>>;
    /**
     * Construct and simulate a set_token_status transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    set_token_status: ({ token, status }: {
        token: string;
        status: ListingStatus;
    }, options?: {
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
    }) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a set_pair_status transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    set_pair_status: ({ symbol, token1, token2, status }: {
        symbol: string;
        token1: string;
        token2: string;
        status: ListingStatus;
    }, options?: {
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
    }) => Promise<AssembledTransaction<null>>;
}
export declare class Client extends ContractClient {
    readonly options: ContractClientOptions;
    constructor(options: ContractClientOptions);
    readonly fromJSON: {
        create_order: (json: string) => AssembledTransaction<Option<OrderBookId>>;
        cancel_order: (json: string) => AssembledTransaction<boolean>;
        deposit: (json: string) => AssembledTransaction<null>;
        withdraw: (json: string) => AssembledTransaction<null>;
        balances: (json: string) => AssembledTransaction<UserBalances>;
        owner: (json: string) => AssembledTransaction<string>;
        fee_collector: (json: string) => AssembledTransaction<string>;
        is_token_listed: (json: string) => AssembledTransaction<boolean>;
        is_pair_listed: (json: string) => AssembledTransaction<boolean>;
        set_token_status: (json: string) => AssembledTransaction<null>;
        set_pair_status: (json: string) => AssembledTransaction<null>;
    };
}
