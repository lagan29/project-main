import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

type CheckoutItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};

const MAX_QTY = 99;
const MAX_LINE_ITEMS = 50;

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "Missing STRIPE_SECRET_KEY. Add it to your .env file." },
      { status: 500 }
    );
  }

  let body: { items?: CheckoutItem[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const items = body.items;
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "No items" }, { status: 400 });
  }
  if (items.length > MAX_LINE_ITEMS) {
    return NextResponse.json({ error: "Too many line items" }, { status: 400 });
  }

  const stripe = new Stripe(secret);

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  for (const raw of items) {
    if (
      typeof raw.id !== "string" ||
      typeof raw.title !== "string" ||
      typeof raw.price !== "number" ||
      typeof raw.quantity !== "number"
    ) {
      return NextResponse.json({ error: "Invalid item shape" }, { status: 400 });
    }
    if (!Number.isFinite(raw.price) || raw.price < 0) {
      return NextResponse.json({ error: "Invalid price" }, { status: 400 });
    }
    if (!Number.isInteger(raw.quantity) || raw.quantity < 1 || raw.quantity > MAX_QTY) {
      return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
    }

    const unitAmountPaise = Math.round(raw.price * 100);
    if (unitAmountPaise < 50) {
      return NextResponse.json({ error: "Amount too small" }, { status: 400 });
    }

    line_items.push({
      quantity: raw.quantity,
      price_data: {
        currency: "inr",
        unit_amount: unitAmountPaise,
        product_data: {
          name: raw.title.slice(0, 250),
        },
      },
    });
  }

  const origin = new URL(req.url).origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      billing_address_collection: "required",
    });

    if (!session.url) {
      return NextResponse.json({ error: "No checkout URL" }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Stripe error";
    console.error("[checkout]", e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
