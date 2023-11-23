import React from "react";
import * as ST from "./style";
import { LuDessert } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { HeaderUtilContent } from "./style";

const Header = () => {
  const navigate = useNavigate();

  const onClickHomeHandler = () => {
    navigate("/");
  };

  const onClickUploadHandler = () => {
    navigate("/goods/content");
  };

  const onClickhandleLogout = () => {
    navigate("/");
  };

  const onClickhandleLogin = () => {
    navigate("/login");
  };

  const onClickhandleJoin = () => {
    navigate("/signup");
  };

  const onClickhandleBasket = () => {
    console.log("Basket 클릭됨");
    navigate("/orders");
  };

  return (
    <ST.HeaderBoxDiv>
      <ST.HeaderContainerDiv>
        <ST.HeaderFlexDiv>
          <LuDessert
            style={{ fontSize: "40px" }}
            onClick={onClickHomeHandler}
          />
          <ST.HeaderTitleH1>Dessert Shop</ST.HeaderTitleH1>
        </ST.HeaderFlexDiv>
        <ST.HeaderUtilDiv>
          <HeaderUtilContent onClick={onClickUploadHandler}>
            판매글 올리기
          </HeaderUtilContent>
          <HeaderUtilContent onClick={onClickhandleBasket}>
            Basket
          </HeaderUtilContent>
          <HeaderUtilContent onClick={onClickhandleLogin}>
            로그인
          </HeaderUtilContent>
          <HeaderUtilContent onClick={onClickhandleLogout}>
            로그아웃
          </HeaderUtilContent>
          <HeaderUtilContent onClick={onClickhandleJoin}>
            회원가입
          </HeaderUtilContent>
        </ST.HeaderUtilDiv>
      </ST.HeaderContainerDiv>
    </ST.HeaderBoxDiv>
  );
};

export default Header;
