import React from "react";
import * as ST from "./style";
import { useNavigate } from "react-router-dom";

const GoodsBanner = () => {
  const navigate = useNavigate();
  // const [userType, setUserType] = useState("BUYER");

  // const { data } = useQuery("checkUserType", checkUserType);
  // console.log(data.filter((a) => a.userId));

  //처음에 undefined 라서 //useEffect를 쓸 때에는 axios값이 오나 안오나를 항상 생각하기
  //
  //  https://github.com/hty0525/front-end/blob/main/src/apis/axiosInstance.js  =>  인터셉터로 인가 퉁치기 - instance/

  //네비게이션
  const onClickUploadHandler = () => {
    navigate("/goods/content");
  };

  return (
    <ST.GoodsBannerDiv>
      <div className="GoodsBannerLeft">
        <h1 className="GoodsBannerH1">
          Welcome to our Bakery & <br /> Dessert Shop!
        </h1>
        <p className="GoodsBannerP">
          Find the most delicious treats available.
        </p>

        <ST.GoodsBannerButtonDiv>
          <p className="GoodsBannerButtonP" onClick={onClickUploadHandler}>
            내 디저트 판매글 올리러 가기
          </p>
        </ST.GoodsBannerButtonDiv>
      </div>
      <ST.GoodsBannerImgBox></ST.GoodsBannerImgBox>
    </ST.GoodsBannerDiv>
  );
};

export default GoodsBanner;
