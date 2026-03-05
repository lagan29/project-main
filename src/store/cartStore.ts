import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, CartItem } from "@/types";

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product: Product) => {
        const existingItem = get().cart.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            cart: get().cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          const cartItem: CartItem = {
            id: product.id,
            name: product.title,
            slug: product.slug,
            price: product.price,
            image_url: product.product_images?.[0]?.image_url,
            quantity: 1,
          };
          set({ cart: [...get().cart, cartItem] });
        }
      },

      increaseQuantity: (id: string) => {
        set({
          cart: get().cart.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        });
      },

      decreaseQuantity: (id: string) => {
        set({
          cart: get()
            .cart.map((item) =>
              item.id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        });
      },

      removeFromCart: (id: string) => {
        set({
          cart: get().cart.filter((item) => item.id !== id),
        });
      },

      clearCart: () => set({ cart: [] }),
    }),
    { name: "femora-cart" }
  )
);
