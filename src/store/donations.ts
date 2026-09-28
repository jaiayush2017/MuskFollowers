import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CauseId, CoinId } from "@/lib/wallets";
import type { Gift } from "@/lib/impact";

type State = {
  gifts: Gift[];
  addGift: (input: { usd: number; cause: CauseId; coin: CoinId }) => Gift;
};

export const useDonations = create<State>()(
  persist(
    (set, get) => ({
      gifts: [],
      addGift: (input) => {
        const gift: Gift = {
          id:
            typeof crypto !== "undefined" && crypto.randomUUID
              ? crypto.randomUUID()
              : `gift-${Date.now()}`,
          usd: input.usd,
          cause: input.cause,
          coin: input.coin,
          at: Date.now(),
        };
        set({ gifts: [...get().gifts, gift] });
        return gift;
      },
    }),
    { name: "muskfollowers-gifts" },
  ),
);
