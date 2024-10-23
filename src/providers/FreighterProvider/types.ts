import { Horizon } from "@stellar/stellar-sdk";

export type WalletConnectStatus = "connecting" | "connected" | "disconnected" | "failed";

interface FreighterNetwork {
  network: string;
  networkPassphrase: string;
}

export interface IFreighterContext {
  status: WalletConnectStatus;
  isConnected: boolean;
  isConnecting: boolean;
  isFailed: boolean;

  network?: FreighterNetwork;
  address?: string;

  client?: Horizon.Server;

  connect: () => Promise<void>;
}
