import ProductDescription from "./product";
import { getEndPoint } from "@/utils/getEndPoint";
import { notFound } from "next/navigation";
import { ProductDescriptionSkeleton } from "./productSekeleton";
import { Suspense } from "react";

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

export default async function ProductPage({ params }: Props) {
  const productDetailsData = await fetchProductDetails(params.productSlug[0]);

  return (
    <Suspense fallback={<ProductDescriptionSkeleton />}>
      <ProductDescription product={productDetailsData} />
    </Suspense>
  );
}
