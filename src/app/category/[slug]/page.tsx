
import Button from "@/components/atoms/Button";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import Image from "next/image";
import { useCartStore } from "@/store/cart";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", slug);

  if (error) {
    return <div className="p-6">Error loading products.</div>;
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl mb-8 capitalize">{slug}</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <div key={product.id} className="rounded-xl p-4">
            <div className="relative w-full aspect-4/5 mb-4">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h2 className="text-lg">{product.title}</h2>
            <p>₹{product.price}</p>
            {/* <Button variant="primary" size="sm" onClick={() => addToCart(product)}>Add to Cart</Button> */}
          </div>
        ))}
      </div>
    </section>
  );
}