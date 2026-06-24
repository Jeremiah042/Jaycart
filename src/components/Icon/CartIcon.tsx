"use client"
import React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/src/Context/cartContext";

const CartIcon = () => {
  const { cartCount } = useCart();
  return (
    <Link href={"/Cart"} className="group relative">
      <ShoppingBag className="w-5 h-5 hover:text-shop-green-500 hover:effect" />
      <span
        className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-green-500 
        text-white text-xs flex items-center justify-center"
      >
        {cartCount}
      </span>
    </Link>
  );
};

export default CartIcon;
