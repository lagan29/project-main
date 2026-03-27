"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Loader from "@/components/atoms/Loader";

type Props = {
  children: React.ReactNode;
};

/** Suspense + route loader for all routes except the homepage (`/`). */
export default function RouteLoaderBoundary({ children }: Props) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return <>{children}</>;
  }

  return <Suspense fallback={<Loader variant="page" />}>{children}</Suspense>;
}
