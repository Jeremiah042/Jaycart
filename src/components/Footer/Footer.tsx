import React from "react";
import Container from "@/src/components/Feature/Container";
import FooterTop from "@/src/components/Footer/FooterTop";
import Logo from "@/src/components/Logo/Logo";
import SocialMedia from "@/src/components/SocialMedia/SocialMedia";
import { SubText, SubTitle } from "@/src/components/Feature/Text";
import { categoriesData, quickLinksData } from "@/src/Constant/data";
import Link from "next/link";
import { Button } from "@/src/components/Feature/button";

const Footer = () => {
  return (
    <footer className="bg-white bordr-t">
      <Container>
        <FooterTop />
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <SubText>
              Discover curated furniture collection at Shopcart, blending style
              and comfort to elevate your living space.
            </SubText>
            <SocialMedia
              className="text-black/60"
              iconClassName="border-black/60 hover:border-shop-green-500 hover:text-shop-green-500"
              tooltipClassName="bg-black text-white"
            />
          </div>
          <div>
            <SubTitle>Quick links</SubTitle>
            <ul className="space-y-3 mt-4">
              {quickLinksData?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={item?.href}
                    className="hover:text-shop-green-500 hoverEffect font-medium"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SubTitle>Cartegories</SubTitle>
            <ul className="space-y-3 mt-4">
              {categoriesData?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={`/categories${item?.href}`}
                    className="hover:text-shop-green-500 hoverEffect font-medium"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <SubTitle>Newsletter</SubTitle>
            <SubText>
              subcribe to our newsletter to receive update and exclusive offers
            </SubText>
            <form>
              <input
                className="space-y-4"
                placeholder="Enter your email"
                type="email"
                required
              />
              <Button className="w-full">Subcribe</Button>
            </form>
          </div>
        </div>
        <div>
          <div className="text-center text-sm text-black/60 py-4 border-t">
            {new Date().getFullYear()} <Logo />. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
