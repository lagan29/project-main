import { z } from "zod";
import { indianStates } from "@/lib/constants/IndianStates";

export const shippingAddressSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  addressLine1: z.string().min(5, "Address Line 1 is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.enum(indianStates as unknown as Record<string, string>, {
    message: "Please select a valid state",
  }),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
});

export type ShippingAddressFormData = z.infer<typeof shippingAddressSchema>;