//글 작성 페이지

import React from "react";
import Header from "../component/Header/Header";
import Footer from "../component/Footer/Footer";
import Product from "../component/Product/Product";

const ProductPage = () => {
  return (
    <div>
      <Header />
      <Product top={"내 디저트 판매글 올리기"} />
      <Footer />
    </div>
  );
};
//
export default ProductPage;
