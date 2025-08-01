interface ProductDescriptionSectionProps {
  description?: string;
}

export function ProductDescriptionSection({
  description = "توضیحات محصول به زودی اضافه خواهد شد.",
}: ProductDescriptionSectionProps) {
  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">توضیحات محصول</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
