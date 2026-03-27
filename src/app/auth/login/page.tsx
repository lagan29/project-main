"use client";

import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { createSupabaseClient } from "@/lib/supabase/client";
import { Eye, EyeOff, ShoppingBag } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import Button from "@/components/atoms/Button";

const inputBase =
  "w-full rounded-xl border border-neutral-200 bg-neutral-100 px-4 py-3.5 text-charcoal-200 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-navy-200/25 focus:border-navy-200 transition-colors";

export default function Login() {
  const supabase = createSupabaseClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: boolean;
    password?: boolean;
  }>({});

  const clearError = (key: "email" | "password") => {
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const mail = email.trim();
    const pass = password;

    const next: typeof fieldErrors = {};
    if (!mail) next.email = true;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) next.email = true;
    if (!pass) next.password = true;

    setFieldErrors(next);
    if (Object.keys(next).length > 0) return;

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: mail,
        password: pass,
      });

      if (error) {
        toast.error("Invalid email or password");
        return;
      }

      toast.success("Welcome back");
      window.location.href = "/";
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-50 px-4 py-10">
      <Toaster position="top-center" />

      <div className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-neutral-200/80 md:grid md:min-h-[560px] md:grid-cols-2">
        {/* Left — hero */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-linear-to-br from-navy-200 to-navy-100 p-10 text-white md:flex">
          <div className="relative z-10 space-y-4">
            <p className="text-sm font-medium uppercase tracking-widest text-white/90">
              FEMORA
            </p>
            <h2 className="font-serif text-3xl leading-tight md:text-4xl">
              Simplify shopping with your personal dashboard.
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-white/90">
              Curated fashion, secure checkout, and orders in one calm place.
            </p>
          </div>
          <div className="relative z-10 mt-8 flex items-end justify-between gap-4">
            <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-sm">
              <ShoppingBag
                className="h-14 w-14 text-white/95"
                strokeWidth={1.25}
              />
            </div>
            <div className="relative h-32 w-40 shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80"
                alt=""
                fill
                className="rounded-2xl object-cover opacity-95"
                sizes="160px"
              />
            </div>
          </div>
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-pink-200/20 blur-2xl" />
        </div>

        {/* Right — form */}
        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-text-300 transition hover:text-navy-200"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-200 text-white">
              <ShoppingBag className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <span className="font-serif text-xl tracking-tight">FEMORA</span>
          </Link>

          <h1 className="text-3xl font-semibold text-charcoal-300">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-charcoal-100">
            Please login to your account
          </p>

          <form className="mt-8 space-y-4" onSubmit={handleLogin} noValidate>
            <div>
              <label htmlFor="login-email" className="sr-only">
                Email address
              </label>
              <input
                id="login-email"
                type="email"
                name="email"
                placeholder="Email address"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearError("email");
                }}
                className={clsx(
                  inputBase,
                  fieldErrors.email && "border-red-500 ring-1 ring-red-500/30",
                )}
                aria-invalid={Boolean(fieldErrors.email)}
              />
            </div>

            <div className="relative">
              <label htmlFor="login-password" className="sr-only">
                Password
              </label>
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearError("password");
                }}
                className={clsx(
                  inputBase,
                  "pr-12",
                  fieldErrors.password &&
                    "border-red-500 ring-1 ring-red-500/30",
                )}
                aria-invalid={Boolean(fieldErrors.password)}
              />
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-charcoal-100 hover:bg-neutral-200/80 hover:text-charcoal-200"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>

            <div className="flex justify-end">
              <Link
                href="/auth/forgot-password"
                className="text-sm text-charcoal-100 underline-offset-2 hover:text-navy-200 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button variant="primary" size="lg" onClick={handleLogin} className="w-full">
              Login
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wide text-neutral-400">
              <span className="bg-white px-3">Or login with</span>
            </div>
          </div>

          <Button
            variant="secondary"
            size="lg"
            onClick={() =>
              toast(
                "Google sign-in can be connected in Supabase OAuth settings.",
              )
            }
          >
            Google
          </Button>

          <p className="mt-8 text-center text-sm text-charcoal-100">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="font-medium text-navy-200 hover:text-navy-100 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
