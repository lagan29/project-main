export type OrderSummaryItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  /** Prefer `image_url` when passing cart lines. */
  image?: string;
  image_url?: string;
  size?: string;
};

export type OrderSummaryProps = {
  items: OrderSummaryItem[];
  subtotal: number;
  shipping: number;
  buttonText: string;
  onButtonClick?: () => void;
  isLoading?: boolean;
};
