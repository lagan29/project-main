import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartProduct {
  id: string;
  title: string;
  price: number;
  image_url?: string;
  size?: string;
}

export interface CartItem extends CartProduct {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (id: string, size?: string) => void;
  increaseQuantity: (id: string, size?: string) => void;
  decreaseQuantity: (id: string, size?: string) => void;
  clearCart: () => void;
}

const sameLineItem = (item: CartItem, id: string, size?: string) =>
  item.id === id && (item.size ?? "") === (size ?? "");

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],

      addToCart: (product) =>
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
        }),

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
