"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { createSupabaseClient } from "@/lib/supabase/client";
import { Eye, EyeOff, ShoppingBag } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

const inputBase =
  "w-full rounded-xl border border-neutral-200 bg-neutral-100 px-4 py-3.5 text-charcoal-200 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-navy-200/25 focus:border-navy-200 transition-colors";

export default function UpdatePassword() {
  const supabase = useMemo(() => createSupabaseClient(), []);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [ready, setReady] = useState(false);
  const [checking, setChecking] = useState(true);
  const [fieldErrors, setFieldErrors] = useState<{
    password?: boolean;
    confirm?: boolean;
  }>({});

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!cancelled && session) {
        setReady(true);
      }
    };

    void check();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (cancelled) return;
      if (event === "PASSWORD_RECOVERY" && session) setReady(true);
    });

    const t = window.setTimeout(() => {
      if (!cancelled) setChecking(false);
    }, 1500);

    return () => {
      cancelled = true;
      window.clearTimeout(t);
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof fieldErrors = {};
    if (!password || password.length < 6) next.password = true;
    if (password !== confirm) next.confirm = true;
    setFieldErrors(next);
    if (Object.keys(next).length > 0) return;

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Password updated. You can sign in now.");
    window.location.href = "/auth/login";
  };

  if (checking && !ready) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-base-50 px-4">
        <p className="text-sm text-text-200">Verifying reset link…</p>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 bg-base-50 text-center">
        <p className="max-w-md text-sm text-text-200">
          This reset link is invalid or has expired. Request a new one from the forgot
          password page.
        </p>
        <Link
          href="/auth/forgot-password"
          className="text-sm font-medium text-navy-200 hover:underline"
        >
          Forgot password
        </Link>
      </div>
    );
  }

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

        <h1 className="font-serif text-3xl text-text-300">Set new password</h1>
        <p className="mt-2 text-sm text-text-200">Choose a strong password for your account.</p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="relative">
            <label htmlFor="new-password" className="sr-only">
              New password
            </label>
            <input
              id="new-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="New password (min. 6 characters)"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFieldErrors((p) => ({ ...p, password: false }));
              }}
              className={clsx(
                inputBase,
                "pr-12",
                fieldErrors.password && "border-red-500 ring-1 ring-red-500/30"
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-charcoal-100 hover:bg-neutral-200/80"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div>
            <label htmlFor="confirm-password" className="sr-only">
              Confirm password
            </label>
            <input
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
                setFieldErrors((p) => ({ ...p, confirm: false }));
              }}
              className={clsx(
                inputBase,
                fieldErrors.confirm && "border-red-500 ring-1 ring-red-500/30"
              )}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-navy-200 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-navy-100 focus:outline-none focus:ring-2 focus:ring-navy-200 focus:ring-offset-2"
          >
            Update password
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-text-200">
          <Link href="/auth/login" className="font-medium text-navy-200 hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
