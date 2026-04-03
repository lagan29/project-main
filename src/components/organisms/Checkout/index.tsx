"use client";

import { useEffect, useMemo, useState } from "react";
import ShippingAddress from "@/components/molecules/ShippingAddress";
import OrderSummary from "@/components/molecules/OrderSummary";
import type { ShippingAddressFormData } from "@/components/molecules/ShippingAddress/types";
import { useCartStore } from "@/store/cart";
import { createSupabaseClient } from "@/lib/supabase/client";
import { usePayments } from "@/hooks/usePayment";

type SavedAddressRow = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  address_line_1: string;
  address_line_2: string | null;
  city: string;
  state: string;
  pincode: string;
};

export default function Checkout() {
  const [savedAddresses, setSavedAddresses] = useState<SavedAddressRow[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<SavedAddressRow | null>(
    null,
  );
  const { initiatePayment } = usePayments();
  const cartItems = useCartStore((state) => state.cart);
  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  }, [cartItems]);

  const shipping = 100;
  const total = subtotal + shipping;

  useEffect(() => {
    let cancelled = false;
  
    (async () => {
      const supabase = createSupabaseClient();
  
      const {
        data: { user },
      } = await supabase.auth.getUser();
  
      if (!user || cancelled) return;
  
      const { data, error } = await supabase
        .from("addresses")
        .select(
          "id, full_name, email, phone, address_line_1, address_line_2, city, state, pincode"
        )
        .eq("user_id", user.id)
        .order("id", { ascending: false });
  
      if (error || cancelled || !data) return;
  
      const rows = data as SavedAddressRow[];
  
      setSavedAddresses(rows);
  
      // ✅ THIS IS THE NEW PART
      if (rows.length > 0) {
        setSelectedAddress(rows[0]);
      }
    })();
  
    return () => {
      cancelled = true;
    };
  }, []);
  const handleAddressSubmit = async (data: ShippingAddressFormData) => {
    try {
      const supabase = createSupabaseClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        alert("Please login first.");
        return;
      }

      const { data: savedRow, error } = await supabase
        .from("addresses")
        .insert([
          {
            user_id: user.id,
            full_name: data.fullName,
            email: data.email,
            phone: data.phone,
            address_line_1: data.addressLine1,
            address_line_2: data.addressLine2 || null,
            city: data.city,
            state: data.state,
            pincode: data.pincode,
            is_default: false,
          },
        ])
        .select()
        .single();

      if (error || !savedRow) {
        console.error(error);
        alert("Failed to save address.");
        return;
      }

      const row = savedRow as SavedAddressRow;
      setSavedAddresses((prev) => [row, ...prev]);
      setSelectedAddress(row);

      alert("Address saved successfully.");
    } catch (error) {
      console.error(error);
      alert("Something went wrong while saving address.");
    }
  };

  const handleProceedToPay = () => {
    if (!selectedAddress) {
      alert("Please select address first");
      return;
    }
  
    initiatePayment(total);
  };

  return (
    <section className="bg-base-50 px-6 py-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-8">
          {savedAddresses.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl text-text-300">Saved addresses</h2>

              {savedAddresses.map((address) => (
                <button
                  key={address.id}
                  type="button"
                  className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                    selectedAddress?.id === address.id
                      ? "border-text-300 bg-gray-50"
                      : "border-black/10 hover:border-black/20"
                  }`}
                  onClick={() => setSelectedAddress(address)}
                >
                  <p className="font-medium">{address.full_name}</p>
                  <p className="text-sm text-gray-600">{address.phone}</p>
                  <p className="mt-2 text-sm text-gray-600">
                    {address.address_line_1}
                    {address.address_line_2 ? `, ${address.address_line_2}` : ""}
                  </p>
                  <p className="text-sm text-gray-600">
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                </button>
              ))}
            </div>
          )}

          <ShippingAddress onSubmit={handleAddressSubmit} />
        </div>

        <OrderSummary
          items={cartItems}
          subtotal={subtotal}
          shipping={shipping}
          buttonText="Proceed to Pay"
          onButtonClick={handleProceedToPay}
        />
      </div>
    </section>
  );
}
