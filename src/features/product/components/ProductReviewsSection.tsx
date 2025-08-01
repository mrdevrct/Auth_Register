import React from "react";
import type { Review } from "../types";

interface ProductReviewsSectionProps {
  initialReviews: Review[];
}

export function ProductReviewsSection({
  initialReviews,
}: ProductReviewsSectionProps) {
  return (
    <div className="mt-8 bg-white rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">نظرات کاربران</h2>
      {initialReviews.length === 0 ? (
        <p className="text-gray-600">هنوز نظری ثبت نشده است.</p>
      ) : (
        <div className="space-y-4">
          {initialReviews.map((review, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{review.author_name}</h3>
                <span className="text-yellow-500">{"★".repeat(review.rating)}</span>
              </div>
              <p className="text-gray-600">{review.review}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}