import { NextResponse } from "next/server";

/**
 * Razorpay flows use POST `/api/razorpay/order` from the client.
 * This route exists so the App Router type validator can resolve the module.
 */
export async function POST() {
  return NextResponse.json(
    {
      error: "Not implemented",
      hint: "Create orders with POST /api/razorpay/order",
    },
    { status: 501 },
  );
}
