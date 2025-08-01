import Animate from "@/components/animate/Animate";
import { ProductDescriptionSection } from "@/features/product/components/ProductDescriptionSection";
import { ProductImageSection } from "@/features/product/components/ProductImageSection";
import { ProductInfoSection } from "@/features/product/components/ProductInfoSection";
import ProductPageSkeleton from "@/features/product/components/ProductPageSkeleton";
import { ProductReviewsSection } from "@/features/product/components/ProductReviewsSection";
import { useProduct } from "@/features/product/hooks/useProduct";
import { useParams } from "react-router-dom";

const initialReviews = [
  {
    author_name: "علی رضایی",
    author_email: "ali.rezaei@example.com",
    review: "محصول بسیار باکیفیت و عالی، ارزش خرید بالایی دارد!",
    rating: 5,
  },
  {
    author_name: "سارا محمدی",
    author_email: "sara.mohammadi@example.com",
    review: "ارسال سریع بود و محصول مطابق توضیحات بود.",
    rating: 4,
  },
];

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, loading, error } = useProduct(id!);

  if (loading) return <ProductPageSkeleton />;
  if (error)
    return (
      <div className="container mx-auto text-center py-16 text-red-500 text-xl">
        {error}
      </div>
    );
  if (!product)
    return (
      <Animate animation="fadeIn" duration={0.5}>
        <div className="container mx-auto text-center py-16 text-2xl font-semibold text-gray-700">
          محصول یافت نشد
        </div>
      </Animate>
    );

  const images = [product.image, ...product.gallery_images];

  return (
    <div className="flex-grow flex flex-col bg-gray-100 p-4">
      <Animate
        animation="bottomToTop"
        duration={0.5}
        className="container mx-auto py-4"
      >
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <ProductImageSection images={images} productName={product.name} />
          <ProductInfoSection product={product} />
        </div>
        <ProductDescriptionSection description={product.description} />
        <ProductReviewsSection initialReviews={initialReviews} />
      </Animate>
    </div>
  );
}
