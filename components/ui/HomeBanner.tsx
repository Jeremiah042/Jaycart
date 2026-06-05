import React from "react";
import { Title } from "./Text";
import Link from "next/link";
import Image from "next/image";
import { banner_1 } from "@/images";


const HomeBanner = () => {
  return (
    <div
      className="py-16 md:py-0 bg-shop-emerald-100 rounded-lg px-10 lg:px-24  flex
    items-center justify-between"
    >
      <div className="space-y-5">
        <Title>
          Grab Upto 50% Off on <br />
          Selected HeadPhones
        </Title>
        <Link
          href={"/Shop"}
          className="bg-shop-green-950/90 text-white/90 px-5 py-2 rounded-md 
         text-sm font-semibold hover:text-white hover:bg-shop-green-950 hovweEffect"
        >
          Buy Now
        </Link>
      </div>
      <div>
        <Image src={banner_1} alt="Banner_1" className="hidden md:inline-flex w-96"/>
      </div>
    </div>
  );
};

export default HomeBanner;
