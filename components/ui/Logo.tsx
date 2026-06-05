import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
const logo = ({ className,spanDesign }: { className?: string,spanDesign?:string }) => {
  return (
    <Link href={"/"} className="inline-flex">
      <h2
        className={cn(
          "text-2xl text-shop-green-500m font-black tracking-wider uppercase hover:text-shop-emerald-500 hoverEffect group font-sans",
          className,
        )}
      >
        Jaycar<span className={cn("text-shop-emerald-400 group-hover:text-shop-green hoverEffect",spanDesign)}>t</span>
      </h2>
    </Link>
  );
};

export default logo;
