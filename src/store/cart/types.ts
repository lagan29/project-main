export interface CartProduct {
  id: string;
  title: string;
  price: number;
  image_url?: string;
  /** Used for `/store/[slug]` links from cart (falls back to `id` if missing). */
  slug?: string;
  size?: string;
}

export interface CartItem extends CartProduct {
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (id: string, size?: string) => void;
  increaseQuantity: (id: string, size?: string) => void;
  decreaseQuantity: (id: string, size?: string) => void;
  clearCart: () => void;
}
