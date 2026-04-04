"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { createSupabaseClient } from "@/lib/supabase/client";
import { Eye, EyeOff, ShoppingBag } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import Button from "@/components/atoms/Button";
import { authSpring } from "../authMotion";
import { getSafeRedirect } from "@/lib/authRedirect";

const inputBase =
  "w-full rounded-lg border border-neutral-200 bg-neutral-100 px-3 py-2.5 text-sm text-charcoal-200 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-navy-200/25 focus:border-navy-200 transition-colors";

const formStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.12 },
  },
};

const formItem = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: authSpring,
  },
};

function LoginPageContent() {
  const searchParams = useSearchParams();
  const returnUrl = useMemo(
    () =>
      getSafeRedirect(
        searchParams.get("redirect") || searchParams.get("next"),
      ),
    [searchParams],
  );

  const supabase = createSupabaseClient();
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 280, damping: 28 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 280, damping: 28 });

  const onCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rotateY.set(px * 9);
    rotateX.set(-py * 9);
  };

  const onCardLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

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
        const msg = (error.message || "").toLowerCase();
        if (
          msg.includes("email not confirmed") ||
          msg.includes("not confirmed")
        ) {
          toast.error("Please confirm your email before signing in.");
          return;
        }
        toast.error(
          "No account found for this email, or the password is wrong. Don't have an account? Sign up below.",
          { duration: 5500 },
        );
        return;
      }

      toast.success("Welcome back");
      window.location.href = returnUrl;
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain bg-base-50 px-4 py-4 sm:py-6">
      <div className="mx-auto my-auto w-full max-w-4xl shrink-0 py-1">
        <>
          <Toaster position="top-center" />

          <div className="w-full perspective-[1400px]" style={{ perspective: 1400 }}>
            <motion.div
              ref={cardRef}
              className="relative w-full overflow-hidden rounded-2xl bg-white shadow-2xl shadow-navy-200/25 ring-1 ring-white/60 md:grid md:grid-cols-2 md:items-stretch"
              initial={{ opacity: 0, y: 36, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ ...authSpring, duration: 0.55 }}
              style={{
                rotateX,
                rotateY,
              }}
              onMouseMove={onCardMove}
              onMouseLeave={onCardLeave}
            >
              <motion.div
                className="pointer-events-none [&_*]:pointer-events-none relative hidden flex-col justify-between gap-4 overflow-hidden bg-linear-to-br from-navy-200 via-navy-100 to-indigo-900/90 p-6 text-white md:flex md:p-7 lg:p-8"
                aria-hidden
              >
                <motion.div
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.12),transparent_50%)]"
                  aria-hidden
                />
                <div className="relative z-10 space-y-2">
                  <motion.p
                    className="text-xs font-medium uppercase tracking-widest text-white/90 md:text-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, ...authSpring }}
                  >
                    FEMORA
                  </motion.p>
                  <motion.h2
                    className="font-serif text-xl leading-snug md:text-2xl lg:text-3xl"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28, ...authSpring }}
                  >
                    Simplify shopping with your personal dashboard.
                  </motion.h2>
                  <motion.p
                    className="text-xs leading-relaxed text-white/90 md:text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.36, ...authSpring }}
                  >
                    Curated fashion, secure checkout, and orders in one calm place.
                  </motion.p>
                </div>
                <motion.div
                  className="relative z-10 mt-4 flex items-end justify-between gap-3"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    className="rounded-xl bg-white/15 p-3 shadow-lg backdrop-blur-md"
                    whileHover={{ scale: 1.05, rotateZ: -2 }}
                  >
                    <ShoppingBag
                      className="h-10 w-10 text-white/95 md:h-11 md:w-11"
                      strokeWidth={1.25}
                    />
                  </motion.div>
                  <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl shadow-xl ring-2 ring-white/20 md:h-28 md:w-36">
                    <Image
                      src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80"
                      alt=""
                      fill
                      className="object-cover opacity-95"
                      sizes="160px"
                    />
                  </div>
                </motion.div>
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-pink-200/25 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-indigo-400/20 blur-3xl" />
              </motion.div>

              <div className="pointer-events-auto relative z-10 flex flex-col justify-center px-5 py-6 sm:px-8 sm:py-7 lg:px-10">
                <Link
                  href="/"
                  className="mb-4 inline-flex items-center gap-2 text-text-300 transition hover:text-navy-200"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-200 text-white md:h-9 md:w-9">
                    <ShoppingBag className="h-4 w-4 md:h-[18px] md:w-[18px]" strokeWidth={1.75} />
                  </span>
                  <span className="font-serif text-lg tracking-tight md:text-xl">FEMORA</span>
                </Link>

                <motion.h1
                  className="text-2xl font-semibold text-charcoal-300 md:text-[1.65rem]"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, ...authSpring }}
                >
                  Welcome back
                </motion.h1>
                <motion.p
                  className="mt-0.5 text-xs text-charcoal-100 md:text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.22 }}
                >
                  Please login to your account
                </motion.p>

                <motion.form
                  className="mt-4 space-y-3"
                  onSubmit={handleLogin}
                  noValidate
                  variants={formStagger}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div variants={formItem}>
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
                  </motion.div>

                  <motion.div className="relative" variants={formItem}>
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
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-charcoal-100 hover:bg-neutral-200/80 hover:text-charcoal-200"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </Button>
                  </motion.div>

                  <motion.div className="flex justify-end" variants={formItem}>
                    <Link
                      href="/auth/forgot-password"
                      className="cursor-pointer text-sm text-charcoal-100 underline-offset-2 hover:text-navy-200 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </motion.div>

                  <motion.div variants={formItem}>
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <Button
                        variant="primary"
                        size="md"
                        type="submit"
                        className="w-full cursor-pointer py-2.5 text-sm shadow-lg shadow-navy-200/30 md:py-3"
                      >
                        Login
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.form>

                <motion.div
                  className="relative my-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                >
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase tracking-wide text-neutral-400">
                    <span className="bg-white px-3">Or login with</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, ...authSpring }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Button
                    variant="secondary"
                    size="md"
                    type="button"
                    className="w-full cursor-pointer py-2.5 text-sm md:py-3"
                    onClick={() =>
                      toast(
                        "Google sign-in can be connected in Supabase OAuth settings.",
                      )
                    }
                  >
                    Google
                  </Button>
                </motion.div>

                <motion.p
                  className="mt-4 text-center text-xs text-charcoal-100 md:text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                >
                  Don&apos;t have an account?{" "}
                  <Link
                    href={
                      returnUrl !== "/"
                        ? `/auth/signup?redirect=${encodeURIComponent(returnUrl)}`
                        : "/auth/signup"
                    }
                    className="cursor-pointer font-medium text-navy-200 hover:text-navy-100 hover:underline"
                  >
                    Sign up
                  </Link>
                </motion.p>
              </div>
            </motion.div>
          </div>
        </>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center bg-base-50 px-4 py-10">
          <p className="text-sm text-charcoal-100">Loading…</p>
        </div>
      }
    >
      <LoginPageContent />
    </Suspense>
  );
}
