import { NextResponse } from "next/server";
import { getCoupons } from "@/lib/api";
import type { Coupon } from "@/components/molecules/CouponSelector/types";

export async function GET() {
  const rows = await getCoupons();
  const coupons: Coupon[] = (rows as Record<string, unknown>[]).map((r) => ({
    id: String(r.id),
    code: String(r.code ?? ""),
    discount: Number(r.discount ?? 0),
    type:
      r.type === "percent" || r.discount_type === "percent"
        ? "percent"
        : "flat",
  }));
  return NextResponse.json(coupons);
}
