import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useCartToastStore } from "@/store/cartToast";
import type { CartItem, CartProduct, CartState } from "./types";

export type { CartProduct, CartItem, CartState } from "./types";

const sameLineItem = (item: CartItem, id: string, size?: string) =>
  item.id === id && (item.size ?? "") === (size ?? "");

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],

      addToCart: (product: CartProduct) => {
        set((state) => {
          const existing = state.cart.find((item) =>
            sameLineItem(item, product.id, product.size)
          );
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                sameLineItem(item, product.id, product.size)
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return {
            cart: [...state.cart, { ...product, quantity: 1 }],
          };
        });
        useCartToastStore.getState().show(product.title);
      },

      removeFromCart: (id, size) =>
        set((state) => ({
          cart: state.cart.filter((item) => !sameLineItem(item, id, size)),
        })),

      increaseQuantity: (id, size) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            sameLineItem(item, id, size)
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      decreaseQuantity: (id, size) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              sameLineItem(item, id, size)
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    { name: "femora-cart" }
  )
);
