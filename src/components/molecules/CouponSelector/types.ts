export type Coupon = {
    id: string;
    code: string;
    discount: number;
    type: "flat" | "percent";
  };
  
  export type Props = {
    coupons: Coupon[];
    subtotal: number;
    onApply: (discountAmount: number) => void;
  };