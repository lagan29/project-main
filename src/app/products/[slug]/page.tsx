import { redirect } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

/** Old URLs used `/products/[slug]`; catalog detail lives under `/store/[slug]`. */
export default async function ProductSlugRedirect({ params }: Props) {
  const { slug: raw } = await params;
  const slug = decodeURIComponent(raw);
  redirect(`/store/${encodeURIComponent(slug)}`);
}
