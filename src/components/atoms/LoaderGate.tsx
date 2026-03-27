"use client";

import { useEffect, useState } from "react";
import Loader from "./Loader";

type LoaderGateProps = {
  /** When true, show fullscreen loader after delay */
  show: boolean;
  /** Skip flash for very fast work */
  delayMs?: number;
};

/** Pair with `useTransition`: show fullscreen loader while `isPending` is true (after a short delay). */
export default function LoaderGate({ show, delayMs = 200 }: LoaderGateProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!show) {
      setVisible(false);
      return;
    }
    const id = window.setTimeout(() => setVisible(true), delayMs);
    return () => window.clearTimeout(id);
  }, [show, delayMs]);

  if (!visible) return null;
  return <Loader variant="fullscreen" />;
}
