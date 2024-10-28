"use client";

import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { IFreighterContext } from "./types";
import freighterApi from "@stellar/freighter-api";
import { Horizon } from "@stellar/stellar-sdk";
import { API } from "@/api/api";

const FreighterContext = createContext<IFreighterContext | undefined>(undefined);

const useFreighter = (): IFreighterContext => {
  const [status, setStatus] = useState<IFreighterContext["status"]>("connecting"); //TODO
  const [network, setNetwork] = useState<IFreighterContext["network"]>();
  const [address, setAddress] = useState<IFreighterContext["address"]>();

  const [client, setClient] = useState<IFreighterContext["client"]>();

  const connect = async () => {
    try {
      setStatus("connecting");
      const { isConnected } = await freighterApi.isConnected();
      if (!isConnected) {
        setStatus("disconnected");
        // TODO open freighter page
        throw new Error("Freighter is not available");
      }
      const result = await freighterApi.requestAccess();
      if (result.error) throw result.error;
    } catch (e) {
      console.error(e);
      setStatus("failed");
    }
  };

  // watch wallet changes
  useEffect(() => {
    setStatus("connecting");
    const watcher = new freighterApi.WatchWalletChanges(1000);
    watcher.watch(({ address, network, networkPassphrase }) => {
      setStatus(address ? "connected" : "disconnected");
      setAddress(address);
      setNetwork({ network, networkPassphrase });
      //temp mock
      API.defaults.headers.common["Authorization"] = address;
    });

    return () => watcher.stop();
  }, []);

  // create client
  useEffect(() => {
    freighterApi
      .getNetworkDetails()
      .then((result) => {
        if (result.error) throw result.error;
        const client = new Horizon.Server(result.networkUrl);
        setClient(client);
      })
      .catch((e) => console.error(e));
  }, [network?.network]);

  return {
    status,
    isConnecting: status === "connecting",
    isConnected: status === "connected",
    isFailed: status === "failed",
    address,
    network,
    client,
    connect,
  };
};

export const useFreighterContext = (): IFreighterContext => {
  const context = useContext(FreighterContext);
  if (!context) {
    throw new Error("useFreighter must be used within a FreighterContext");
  }

  return context;
};

const FreighterProvider = ({ children }: PropsWithChildren) => {
  const value = useFreighter();

  return <FreighterContext.Provider value={value}>{children}</FreighterContext.Provider>;
};

export default FreighterProvider;
