import { getProductBySlug } from "@/lib/api";
import Image from "next/image";
import AddToCartButton from "@/components/product/AddToCartButton";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
      <div>
        <Image
          src={product.product_images?.[0]?.image_url ?? ""}
          alt={product.title}
          width={800}
          height={900}
          className="rounded-2xl object-cover w-full"
        />
      </div>

      <div>
        <h1 className="text-4xl font-serif text-text-300">{product.title}</h1>

        <p className="mt-4 text-2xl text-navy-200 font-medium">
          ₹ {product.price}
        </p>

        <p className="mt-6 text-text-200">{product.description}</p>

        <div className="mt-8">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
