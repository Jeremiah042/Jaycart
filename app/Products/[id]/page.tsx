"use client";

import { popularProducts, } from "@/Constant/data";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useState } from "react";
import { Stars, ShoppingBag, Truck, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  const product = popularProducts.find((p) => String(p.id) === params.id);

  const getInitialColor = () => {
    if (!product) return "";
    return Array.isArray(product.color) ? product.color[0] : product.color;
  };

  const getInitialImage = () => {
    if (!product) return "";
    return Array.isArray(product.image) ? product.image[0] : product.image;
  };

  const [selectedColor, setSelectedColor] = useState(getInitialColor);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(getInitialImage);

  if (!product) return notFound();

  const colors = Array.isArray(product.color) ? product.color : [product.color];
  const images = Array.isArray(product.image) ? product.image : [product.image];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* ---- LEFT: Images ---- */}
        <div className="flex flex-col gap-3">
          <div className="relative w-full h-80 rounded-2xl overflow-hidden border border-gray-200 bg-white">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              className="object-contain p-4"
            />
            {product.discount && (
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                -{product.discount}% OFF
              </span>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                    activeImage === img ? "border-green-500" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`thumb-${i}`}
                    fill
                    className="object-contain p-1"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ---- RIGHT: Details ---- */}
        <div className="flex flex-col gap-4">
          {/* Category + Name */}
          <div>
            <p className="text-sm text-green-600 font-medium uppercase tracking-wide">
              {product.category}
            </p>
            <h1 className="text-2xl font-bold text-gray-800 mt-1">
              {product.name}
            </h1>
          </div>

          {/* Rating + Reviews */}
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Stars
                  key={i}
                  size={16}
                  fill={
                    i + 1 <= Math.floor(product.rating)
                      ? "currentColor"
                      : "none"
                  }
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">
              {product.rating}
            </span>
            {product.reviews && (
              <span className="text-sm text-gray-400">
                ({product.reviews} reviews)
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.discount && (
              <span className="text-sm font-medium text-red-500 bg-red-50 px-2 py-1 rounded-full">
                -{product.discount}% OFF
              </span>
            )}
          </div>

          {/* In Stock */}
          <p
            className={`text-sm font-semibold ${product.instock ? "text-green-600" : "text-red-500"}`}
          >
            {product.instock ? "✔ In Stock" : "✘ Out of Stock"}
          </p>

          {/* Description */}
          <p className="text-sm text-gray-500 leading-relaxed">
            {product.description}
          </p>

          {/* Color Picker */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Color:{" "}
              <span className="font-normal text-gray-500">{selectedColor}</span>
            </p>
            <div className="flex gap-2 flex-wrap">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1 rounded-full border text-sm transition ${
                    selectedColor === color
                      ? "border-green-500 bg-green-500 text-white"
                      : "border-gray-300 text-gray-600 hover:border-green-400"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Quantity</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-xl hover:bg-gray-100 transition"
              >
                −
              </button>
              <span className="w-6 text-center font-bold text-gray-800">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-xl hover:bg-gray-100 transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-2">
            <Button
              variant="outline"
              className="flex-1 flex items-center gap-2 border-green-500 text-green-600 hover:bg-green-50"
            >
              <ShoppingBag size={18} /> Add to Cart
            </Button>
            <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white">
              Buy Now
            </Button>
          </div>

          {/* Delivery Info */}
          <div className="border border-gray-200 rounded-2xl p-4 flex flex-col gap-3 text-sm text-gray-600 mt-2">
            <div className="flex items-start gap-3">
              <Truck size={18} className="text-green-500 mt-0.5 shrink-0" />
              <p>
                <span className="font-semibold text-gray-800">
                  Free Delivery
                </span>{" "}
                — Enter your postal code for delivery availability
              </p>
            </div>
            <div className="border-t border-gray-100" />
            <div className="flex items-start gap-3">
              <RefreshCcw
                size={18}
                className="text-green-500 mt-0.5 shrink-0"
              />
              <p>
                <span className="font-semibold text-gray-800">
                  Return Delivery
                </span>{" "}
                — Free returns within 30 days.{" "}
                <span className="text-green-600 underline cursor-pointer">
                  See details
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
