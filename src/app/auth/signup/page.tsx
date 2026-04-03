"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { createSupabaseClient } from "@/lib/supabase/client";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import Button from "@/components/atoms/Button";
import toast, { Toaster } from "react-hot-toast";
import { authSpring } from "../authMotion";

type FieldKey = "firstName" | "email" | "password";

const formStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.065, delayChildren: 0.1 },
  },
};

const formItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: authSpring,
  },
};

export default function SignupPage() {
  const supabase = createSupabaseClient();
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 260, damping: 26 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 260, damping: 26 });

  const onCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rotateY.set(-px * 8);
    rotateX.set(py * 8);
  };

  const onCardLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

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
        window.location.href = "/";
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain bg-base-50 px-4 py-4 sm:py-6">
      <div className="mx-auto my-auto w-full max-w-4xl shrink-0 py-1">
        <>
          <Toaster position="top-right" />

          <div className="w-full perspective-[1400px]" style={{ perspective: 1400 }}>
            <motion.div
              ref={cardRef}
              className="relative grid overflow-hidden rounded-2xl bg-linear-to-br from-rose-50/80 via-base-50 to-amber-50/40 shadow-2xl shadow-rose-200/20 ring-1 ring-rose-100/80 md:grid-cols-2 md:items-stretch"
              initial={{ opacity: 0, y: -28, scale: 0.94 }}
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
                className="pointer-events-none [&_*]:pointer-events-none relative order-2 hidden aspect-4/3 overflow-hidden md:order-1 md:block md:aspect-auto md:min-h-0"
                aria-hidden
              >
                <div className="absolute inset-3 overflow-hidden rounded-2xl shadow-2xl ring-2 ring-white/40 md:inset-4 md:rounded-3xl">
                  <Image
                    src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80"
                    alt="Fashion"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-rose-950/70 via-rose-900/20 to-transparent" />
                  <motion.div
                    className="absolute left-4 top-4 flex items-center gap-2 text-white md:left-6 md:top-6"
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25, ...authSpring }}
                  >
                    <span className="font-serif text-lg tracking-tight drop-shadow-md md:text-2xl">
                      FEMORA
                    </span>
                    <motion.span
                      animate={{ rotate: [0, 12, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Sparkles className="h-6 w-6 text-amber-200" />
                    </motion.span>
                  </motion.div>
                  <p className="absolute bottom-4 left-4 right-4 text-xs font-medium text-white/95 drop-shadow md:bottom-6 md:left-6 md:right-6 md:text-sm">
                    Join thousands styling their wardrobe with FEMORA.
                  </p>
                </div>
                <motion.div
                  className="pointer-events-none absolute -right-8 top-1/4 h-32 w-32 rounded-full bg-amber-300/30 blur-3xl"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.65, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>

              <div
                className="pointer-events-auto relative z-10 order-1 flex items-center justify-center px-5 py-6 sm:px-7 sm:py-7 md:order-2"
              >
                <div className="w-full max-w-md">
                  <motion.button
                    type="button"
                    className="mb-1.5 w-full cursor-pointer border-0 bg-linear-to-r from-charcoal-300 via-navy-200 to-rose-400 bg-clip-text p-0 text-left text-2xl font-semibold text-transparent outline-none md:text-3xl focus-visible:ring-2 focus-visible:ring-navy-200/30 focus-visible:ring-offset-2 rounded-sm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12, ...authSpring }}
                  >
                    Create an Account
                  </motion.button>

                  <motion.p
                    className="mb-4 text-xs text-charcoal-100 md:mb-5 md:text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Already have an account?{" "}
                    <Link
                      href="/auth/login"
                      className="cursor-pointer font-medium text-navy-200 underline decoration-navy-200/40 underline-offset-2 hover:text-navy-100"
                    >
                      Log in
                    </Link>
                  </motion.p>

                  <motion.form
                    onSubmit={handleSignup}
                    className="space-y-3"
                    noValidate
                    variants={formStagger}
                    initial="hidden"
                    animate="show"
                  >
                    <motion.div
                      className="grid grid-cols-2 gap-2 sm:gap-3"
                      variants={formItem}
                    >
                      <input
                        placeholder="First name *"
                        className={clsx(
                          "input border rounded-lg bg-white/95 px-3 py-2 text-sm shadow-sm transition-shadow focus:shadow-md",
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
                        className="input border rounded-lg bg-white/95 px-3 py-2 text-sm shadow-sm"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </motion.div>

                    <motion.div variants={formItem}>
                      <input
                        type="email"
                        placeholder="Email address *"
                        className={clsx(
                          "input w-full border rounded-lg bg-white/95 px-3 py-2 text-sm shadow-sm",
                          fieldErrors.email && "border-red-500",
                        )}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          clearFieldError("email");
                        }}
                      />
                    </motion.div>

                    <motion.div className="relative" variants={formItem}>
                      <label htmlFor="signup-password" className="sr-only">
                        Password
                      </label>
                      <input
                        id="signup-password"
                        name="new-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password *"
                        autoComplete="new-password"
                        className={clsx(
                          "relative z-[1] w-full rounded-lg border bg-white/95 py-2 pl-3 pr-11 text-sm shadow-sm outline-none focus:ring-2 focus:ring-navy-200/25",
                          fieldErrors.password && "border-red-500",
                          !fieldErrors.password && "border-neutral-200",
                        )}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          clearFieldError("password");
                        }}
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 z-[2] flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-charcoal-100 hover:bg-neutral-200/80 hover:text-charcoal-200"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowPassword((v) => !v);
                        }}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff size={18} strokeWidth={1.75} />
                        ) : (
                          <Eye size={18} strokeWidth={1.75} />
                        )}
                      </button>
                    </motion.div>

                    <motion.div variants={formItem}>
                      <motion.div >
                        <Button
                          type="submit"
                          size="md"
                          className="w-full cursor-pointer bg-linear-to-r from-navy-200 to-rose-400 py-2.5 text-sm text-white shadow-lg shadow-navy-200/35 hover:opacity-95 md:py-3"
                        >
                          Create account
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.form>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      </div>
    </div>
  );
}
