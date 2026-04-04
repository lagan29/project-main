/** Only allow same-site relative paths (no open redirects). */
export function getSafeRedirect(raw: string | null | undefined): string {
  if (!raw || typeof raw !== "string") return "/";
  const t = raw.trim();
  if (!t.startsWith("/") || t.startsWith("//")) return "/";
  if (t.includes(":") || t.includes("\\")) return "/";
  return t;
}
