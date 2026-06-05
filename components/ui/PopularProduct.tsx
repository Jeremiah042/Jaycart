"use client";

import React, { useState } from "react";
import Image from "next/image";
import { popularProducts } from "@/Constant/data";
import { Stars, ShoppingBag } from "lucide-react";
import { Button } from "./button";
import Link from "next/link";

export const categories = [
  { id: "1", name: "Gadget" },
  { id: "2", name: "Appliances" },
  { id: "3", name: "Fashion" },
  { id: "4", name: "Others" },
];

const PopularProduct = () => {
  const [selectedCategory, setSelectedCategory] = useState("Gadget");

  // Filter products by matching category string (case-insensitive)
  const filteredProducts = popularProducts?.filter(
    (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  return (
    <div className="space-y-6">
      <div className="flex gap-2 pb-4 border-b border-gray-100">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
            className={`border px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-green-500 hover:text-white hoverEffect
              ${
                selectedCategory === category.name
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-green-500/20 text-black/60 border-green-500/30"
              }`}
          >
            {category.name}
          </button>
        ))}
        <div className="border border-green-500/30 px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-green-500 hover:text-white hoverEffect">
          <Link href={"/Shop"}>See all</Link>
        </div>
      </div>

      {filteredProducts && filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative w-full h-60 flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain mb-4"
                  width={400}
                  height={240}
                />
              </div>

              <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>

              <div className="flex items-center gap-3">
                <span className="text-xl font-bold">${item.price.toFixed(2)}</span>
                {item.discount && (
                  <span className="text-lg font-medium text-red-500 px-2 py-1 rounded-full">
                    -{item.discount}% OFF
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <div className="flex flex-row text-yellow-400 fill-current">
                  {[...Array(5)].map((_, i) => (
                    <Stars
                      key={i}
                      size={15}
                      fill={i + 1 <= Math.floor(item.rating) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-medium">{item.rating}</span>
              </div>

              <p className="text-sm font-medium text-green-600">
                In Stock: {item.instock ? "Yes" : "No"}
              </p>
              <p className="text-sm text-gray-500">Colors: {item.color}</p>

              <Button className="flex items-center gap-2 mt-auto">
                <ShoppingBag size={18} /> Add to Cart
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          No products found in this category.
        </div>
      )}
    </div>
  );
};

export default PopularProduct;