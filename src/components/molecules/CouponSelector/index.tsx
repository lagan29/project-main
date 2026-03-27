"use client";

import { useState } from "react";

import type { Coupon, Props } from "./types";
import Button from "@/components/atoms/Button";

export default function CouponSelector({ coupons, subtotal, onApply }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  function handleApply(coupon: Coupon) {
    setSelected(coupon.id);

    let discountAmount = 0;

    if (coupon.type === "flat") {
      discountAmount = coupon.discount;
    } else {
      discountAmount = (subtotal * coupon.discount) / 100;
    }

    onApply(discountAmount);
  }

  return (
    <div className="mt-6">
      <h3 className="font-medium mb-2">Apply Coupon</h3>

      <div className="flex flex-wrap gap-2">
        {coupons.map((coupon) => (
          <Button
            key={coupon.id}
            onClick={() => handleApply(coupon)}
            className={`px-4 py-2 border rounded-full text-sm transition
              ${selected === coupon.id ? "bg-black text-white" : "hover:bg-gray-100"}`}
          >
            {coupon.code} (
            {coupon.type === "flat"
              ? `₹${coupon.discount}`
              : `${coupon.discount}%`}
            )
          </Button>
        ))}
      </div>
    </div>
  );
}