//상세페이지+커멘트

import React from "react";
import Header from "../component/Header/Header";
import Footer from "../component/Footer/Footer";
import Information from "../component/Detail/Information";
// import Comment from "../component/Detail/Comment";
//
const DetailPage = () => {
  return (
    <div>
      <Header />
      <Information />
      {/* <Comment /> */}
      <Footer />
    </div>
  );
};

export default DetailPage;
