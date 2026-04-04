"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingAddressSchema } from "@/lib/validations/shippingAddressSchema";
import { indianStates } from "@/lib/constants/IndianStates";
import type {
  ShippingAddressFormData,
  ShippingAddressProps,
} from "./types";
import Button from "@/components/atoms/Button";

export default function ShippingAddress({
  defaultValues,
  onSubmit,
}: ShippingAddressProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingAddressFormData>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      fullName: defaultValues?.fullName ?? "",
      email: defaultValues?.email ?? "",
      phone: defaultValues?.phone ?? "",
      addressLine1: defaultValues?.addressLine1 ?? "",
      addressLine2: defaultValues?.addressLine2 ?? "",
      city: defaultValues?.city ?? "",
      state: defaultValues?.state ?? "",
      pincode: defaultValues?.pincode ?? "",
    },
  });

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-3xl text-text-300">Shipping Address</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <input
              {...register("fullName")}
              placeholder="Full Name"
              className="w-full rounded-xl border border-black/20 px-4 py-3 outline-none"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("phone")}
              placeholder="Phone Number"
              className="w-full rounded-xl border border-black/20 px-4 py-3 outline-none"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full rounded-xl border border-black/20 px-4 py-3 outline-none"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("addressLine1")}
            placeholder="Address Line 1"
            className="w-full rounded-xl border border-black/20 px-4 py-3 outline-none"
          />
          {errors.addressLine1 && (
            <p className="mt-1 text-sm text-red-500">
              {errors.addressLine1.message}
            </p>
          )}
        </div>

        <div>
          <input
            {...register("addressLine2")}
            placeholder="Address Line 2"
            className="w-full rounded-xl border border-black/20 px-4 py-3 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <input
              {...register("city")}
              placeholder="City"
              className="w-full rounded-xl border border-black/20 px-4 py-3 outline-none"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>
            )}
          </div>

          <div>
            <select
              {...register("state")}
              className="w-full rounded-xl border border-black/20 px-4 py-3 outline-none"
            >
              <option value="">State</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="mt-1 text-sm text-red-500">{errors.state.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("pincode")}
              placeholder="Pincode"
              className="w-full rounded-xl border border-black/20 px-4 py-3 outline-none"
            />
            {errors.pincode && (
              <p className="mt-1 text-sm text-red-500">
                {errors.pincode.message}
              </p>
            )}
          </div>
        </div>

        <Button type="submit" variant="primary" size="md">
          Save Address
        </Button>
      </form>
    </div>
  );
}