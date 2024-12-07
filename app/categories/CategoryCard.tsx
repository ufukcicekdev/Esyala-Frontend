import React from "react";
import Link from "next/link";  // Link bileşenini import et

interface CategoryCardProps {
  name: string;
  slug: string;
  image?: string; // İsteğe bağlı, kategoriye özel bir ikon varsa
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, slug, image }) => {
  return (
    <Link href={`/category/${slug}/`} passHref>
      <div className="flex flex-col items-center justify-center p-4 bg-white shadow-md rounded-md hover:shadow-lg transition-shadow cursor-pointer">
        <div className="mb-4">
          {/* İkon burada olabilir */}
          {image ? (
            <img src={image} alt={name} className="w-16 h-16" />
          ) : (
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
          )}
        </div>
        <h3 className="text-lg font-medium text-gray-800">{name}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
