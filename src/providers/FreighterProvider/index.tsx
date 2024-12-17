"use client";

import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { IFreighterContext } from "./types";
import freighterApi from "@stellar/freighter-api";
import { API } from "@/api/api";

const FreighterContext = createContext<IFreighterContext | undefined>(undefined);

const useFreighter = (): IFreighterContext => {
  const [status, setStatus] = useState<IFreighterContext["status"]>("connecting"); //TODO
  const [network, setNetwork] = useState<IFreighterContext["network"]>();
  const [address, setAddress] = useState<IFreighterContext["address"]>();

  const connect = async () => {
    try {
      setStatus("connecting");
      const { isConnected } = await freighterApi.isConnected();
      if (!isConnected) {
        setStatus("disconnected");
        window.open("https://www.freighter.app/", "_blank");
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

    freighterApi.isConnected().then((res) => {
      if (!res.isConnected) setStatus("disconnected");
    });

    const watcher = new freighterApi.WatchWalletChanges(1000);
    watcher.watch(({ address, network, networkPassphrase }) => {
      //temp mock
      API.defaults.headers.common["Authorization"] = address;
      //
      setStatus(address ? "connected" : "disconnected");
      setAddress(address);
      setNetwork({ network, networkPassphrase });
    });

    return () => watcher.stop();
  }, []);

  return {
    status,
    isConnecting: status === "connecting",
    isConnected: status === "connected",
    isFailed: status === "failed",
    address,
    network,
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
