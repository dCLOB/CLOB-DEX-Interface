import { create } from "zustand";

type Store = {
  pair: string;
  setPair: (payload: string) => void;
};

const usePairStore = create<Store>()((set) => ({
  pair: "USDC-XLM",
  setPair: (payload: string) => set(() => ({ pair: payload })),
}));

export default usePairStore;
