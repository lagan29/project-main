"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { createSupabaseClient } from "@/lib/supabase/client";
import { ShoppingBag } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

const inputBase =
  "w-full rounded-xl border border-neutral-200 bg-neutral-100 px-4 py-3.5 text-charcoal-200 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-navy-200/25 focus:border-navy-200 transition-colors";

export default function ForgotPassword() {
  const supabase = useMemo(() => createSupabaseClient(), []);
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const mail = email.trim();
    if (!mail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
      setFieldError(true);
      return;
    }
    setFieldError(false);

    const { error } = await supabase.auth.resetPasswordForEmail(mail, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    setSent(true);
    toast.success("Check your email for the reset link.");
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-base-50 px-4 py-16">
      <Toaster position="top-center" />

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg shadow-neutral-200/60 md:p-10">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-text-300 transition hover:text-navy-200"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-200 text-white">
            <ShoppingBag className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <span className="font-serif text-xl tracking-tight">FEMORA</span>
        </Link>

        <h1 className="font-serif text-3xl text-text-300">Forgot password</h1>
        <p className="mt-2 text-sm text-text-200">
          Enter your email and we&apos;ll send you a link to choose a new password.
        </p>

        {sent ? (
          <div className="mt-8 rounded-xl border border-neutral-200 bg-base-50 p-4 text-sm text-text-200">
            If an account exists for <strong className="text-charcoal-200">{email}</strong>, you
            will receive an email shortly. Check your inbox and spam folder.
          </div>
        ) : (
          <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="forgot-email" className="sr-only">
                Email
              </label>
              <input
                id="forgot-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFieldError(false);
                }}
                className={clsx(
                  inputBase,
                  fieldError && "border-red-500 ring-1 ring-red-500/30"
                )}
                aria-invalid={fieldError}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-navy-200 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-navy-100 focus:outline-none focus:ring-2 focus:ring-navy-200 focus:ring-offset-2"
            >
              Send reset link
            </button>
          </form>
        )}

        <p className="mt-8 text-center text-sm text-text-200">
          <Link
            href="/auth/login"
            className="font-medium text-navy-200 hover:text-navy-100 hover:underline"
          >
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
