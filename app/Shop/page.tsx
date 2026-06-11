"use client";

import React, { useState } from "react";
import Image from "next/image";
import { shopProducts } from "@/Constant/data";
import { Stars, ShoppingBag, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/Context/cartContext";

const ShopProduct = () => {
  // 1. State to handle the search query
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();

  // 2. Filter products dynamically based on the search query
  const filteredProducts = shopProducts?.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* --- Search Bar Container --- */}
      <div className="relative max-w-md w-full mx-auto md:mx-0">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-sm"
        />
        {/* Clear button appears only when there's text */}
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* --- Products Layout --- */}
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
                  alt={item.name || "Product Image"}
                  className="w-full h-full object-contain mb-4 group-hover:scale-105 transition-transform duration-300"
                  width={400}
                  height={240}
                />
              </div>

              <h3 className="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                {item.name}
              </h3>

              <div className="flex items-center gap-3">
                <span className="text-xl font-bold">
                  ${item.price.toFixed(2)}
                </span>
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
                      fill={
                        i + 1 <= Math.floor(item.rating)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  {item.rating}
                </span>
              </div>

              <p className="text-sm font-medium text-green-600">
                In Stock: {item.instock ? "Yes" : "No"}
              </p>
              <p className="text-sm text-gray-500">Colors: {item.color}</p>

              {/* mt-auto pushes the button to the bottom of the card uniformly */}
              <Button
                className="flex items-center gap-2 mt-auto"
                onClick={() =>
                  addToCart({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    quantity: 1,
                  })
                }
              >
                <ShoppingBag size={18} /> <span>Add to Cart</span>
              </Button>
            </div>
          ))}
        </div>
      ) : (
        /* --- Empty State --- */
        <div className="text-center py-12 border border-dashed border-gray-200 rounded-2xl bg-gray-50">
          <p className="text-gray-500 font-medium">
            No products found matching "{searchQuery}"
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="mt-2 text-sm text-blue-600 hover:underline font-semibold"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopProduct;
