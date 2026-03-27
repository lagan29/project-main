"use client";

import { useState } from "react";
import clsx from "clsx";
import { createSupabaseClient } from "@/lib/supabase/client";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import Button from "@/components/atoms/Button";
import toast, { Toaster } from "react-hot-toast";

type FieldKey = "firstName" | "email" | "password";

export default function SignupPage() {
  const supabase = createSupabaseClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<FieldKey, boolean>>
  >({});

  const clearFieldError = (key: FieldKey) => {
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSignup = async (e?: React.FormEvent) => {
    e?.preventDefault();

    const nextErrors: Partial<Record<FieldKey, boolean>> = {};

    // ✅ VALIDATIONS
    if (!firstName.trim()) nextErrors.firstName = true;

    if (!email.trim()) nextErrors.email = true;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = true;

    if (!password) nextErrors.password = true;
    else if (password.length < 6) nextErrors.password = true;

    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        if (error.message.toLowerCase().includes("already")) {
          toast.error("User already exists. Please login.");
          return;
        }

        toast.error(error.message);
        return;
      }

      if (data.user) {
        await supabase.from("profiles").upsert({
          id: data.user.id,
          first_name: firstName,
          last_name: lastName,
        });

        toast.success("Welcome to FEMORA 💖");

        // ✅ stay on same page
        window.location.reload();
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-base-50">
      <Toaster position="top-right" />

      {/* LEFT IMAGE */}
      <div className="hidden md:block relative m-4 rounded-3xl overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80"
          alt="Fashion"
          fill
          className="object-cover"
        />
        <div className="absolute top-6 left-6 text-white text-xl font-serif">
          FEMORA
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-semibold mb-2">Create an Account</h1>

          <p className="text-sm mb-6">
            Already have an account?{" "}
            <Link href="/auth/login" className="underline">
              Log in
            </Link>
          </p>

          <form onSubmit={handleSignup} className="space-y-4" noValidate>
            {/* NAME */}
            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="First name *"
                className={clsx(
                  "input border",
                  fieldErrors.firstName && "border-red-500",
                )}
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  clearFieldError("firstName");
                }}
              />

              <input
                placeholder="Last name"
                className="input border"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email address *"
              className={clsx(
                "input w-full border",
                fieldErrors.email && "border-red-500",
              )}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearFieldError("email");
              }}
            />

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password *"
                className={clsx(
                  "input w-full pr-10 border",
                  fieldErrors.password && "border-red-500",
                )}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearFieldError("password");
                }}
              />

              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>

            <Button type="submit" className="w-full">
              Create account
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
