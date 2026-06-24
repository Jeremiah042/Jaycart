import Container from "@/src/components/Feature/Container";
import HomeBanner from "@/src/components/Home/HomeBanner";
import PopularProduct from "@/src/components/Product/PopularProduct";

import React from "react";

const page = () => {
  return (
    <Container className="">
      <HomeBanner />
      <div className="py-10"></div>
      <div>
        <PopularProduct />
      </div>
    </Container>
  );
};

export default page;
