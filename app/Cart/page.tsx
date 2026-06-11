"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/Context/cartContext";
import { Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

type Currency = "NGN" | "USD";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartCount } = useCart();

  const [currency, setCurrency] = useState<Currency>("NGN");
  const [usdToNgn, setUsdToNgn] = useState<number>(1354);
  const [rateLoading, setRateLoading] = useState(true);

  // Fetch live USD/NGN rate
  useEffect(() => {
    async function fetchRate() {
      try {
        const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        const data = await res.json();
        if (data?.rates?.NGN) setUsdToNgn(data.rates.NGN);
      } catch {
        // silently fall back to default rate
      } finally {
        setRateLoading(false);
      }
    }
    fetchRate();
  }, []);

  function formatPrice(amountNgn: number): string {
    const value = currency === "USD" ? amountNgn / usdToNgn : amountNgn;
    return new Intl.NumberFormat(currency === "NGN" ? "en-NG" : "en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: currency === "USD" ? 2 : 0,
      maximumFractionDigits: currency === "USD" ? 2 : 0,
    }).format(value);
  }

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <ShoppingBag size={64} className="text-gray-300" />
        <h2 className="text-2xl font-bold text-gray-500">Your cart is empty</h2>
        <Link href="/">
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">

      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">
          Your Cart{" "}
          <span className="text-green-500">({cartCount} items)</span>
        </h1>

        {/* Currency Toggle */}
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
          {(["NGN", "USD"] as Currency[]).map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition ${
                currency === c
                  ? "bg-gray-900 text-white"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {c === "NGN" ? "₦ NGN" : "$ USD"}
            </button>
          ))}
        </div>
      </div>

      {/* Live rate badge */}
      {!rateLoading && (
        <p className="text-xs text-gray-400 -mt-4">
          Live rate: $1 = ₦
          {usdToNgn.toLocaleString("en-NG", { maximumFractionDigits: 2 })}
          <span className="ml-1 text-gray-300">· updates on page load</span>
        </p>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"
            >
              <div className="relative w-24 h-24 shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col flex-1 gap-1">
                <h3 className="font-bold text-gray-800">{item.name}</h3>
                <p className="text-green-600 font-semibold">
                  {formatPrice(item.price)}
                </p>

                {/* Quantity controls */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                {/* Line total */}
                <p className="text-xs text-gray-400 mt-1">
                  Subtotal: {formatPrice(item.price * item.quantity)}
                </p>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-400 hover:text-red-600 self-start"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-72 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm h-fit space-y-4">
          <h2 className="text-xl font-bold">Order Summary</h2>
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span className="text-green-500">Free</span>
          </div>
          <div className="border-t pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <Link href="/Checkout">
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white mt-2">
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;