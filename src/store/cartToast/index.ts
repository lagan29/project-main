import { create } from "zustand";
import type { CartToastState } from "./types";

export type { CartToastState } from "./types";

export const useCartToastStore = create<CartToastState>((set) => ({
  visible: false,
  productTitle: "",
  nonce: 0,
  show: (productTitle) =>
    set((s) => ({
      visible: true,
      productTitle: productTitle.trim().slice(0, 72) || "Your item",
      nonce: s.nonce + 1,
    })),
  hide: () => set({ visible: false }),
}));
