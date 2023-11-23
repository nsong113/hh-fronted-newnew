//메인페이지

import React from "react";
import Header from "../component/Header/Header";
import Footer from "../component/Footer/Footer";
import Goods from "../component/Goods/Goods";
import GoodsBanner from "../component/Goods/GoodsBanner";
//
const GoodsPage = () => {
  return (
    <div>
      <Header />
      <GoodsBanner />
      <Goods />
      <Footer />
    </div>
  );
};

export default GoodsPage;
