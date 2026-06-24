"use client";

import { headerData } from "@/src/Constant/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const HeaderMenu = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div
      className="hidden md:inline-flex w-1/3 items-center 
    gap-7 text-sm capitalize font-semibold text-lightcolor"
    >
      {headerData?.map((item) => (
        <Link
          key={item?.title}
          href={item?.href}
          className={`hover:text-green-500 hoverEffect relative group`}
        >
          {item?.title}
          <span
            className={`absolute -bottom-0.5 left-1/2 w-1 h-0.5
                bg-green-600 group-hover:w-1/2 hoverEffect group-hover:left-0`}
          />
          <span
            className={`absolute -bottom-0.5 right-1/2 w-1 h-0.5
               bg-shop-green-600 group-hover:w-1/2 hoverEffect group-hover:right-0`}
          />
        </Link>
      ))}
    </div>
  );
};

export default HeaderMenu;
