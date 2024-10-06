import ProductDescription from "./product";
import { getEndPoint } from "@/utils/getEndPoint";
import { notFound } from "next/navigation";
import { ProductDescriptionSkeleton } from "./productSekeleton";
import { Suspense } from "react";
import { Metadata } from "next";

type Props = {
  params: { productSlug: string[] };
};

type ProductDetails = {
  _doc: {
    capacity: { unit: "kilowatt-hours"; value: 3 };
    _id: string;
    vendor: string;
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    warranty: string;
    brand: string;
    images: [{ image: string }];
    createdAt: string;
    updatedAt: string;
  };
};

async function fetchProductDetails(slug: string) {
  const fetchProductDetails = await fetch(`${getEndPoint()}/api/product/${slug}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!fetchProductDetails.ok) {
    return notFound();
  }

  const productDetailsJson = (await fetchProductDetails.json()) as ProductDetails;
  return productDetailsJson._doc;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await fetchProductDetails(params.productSlug[0]);
  
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.images[0].image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.images[0].image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const productDetailsData = await fetchProductDetails(params.productSlug[0]);

  return (
    <Suspense fallback={<ProductDescriptionSkeleton />}>
      <ProductDescription product={productDetailsData} />
    </Suspense>
  );
}