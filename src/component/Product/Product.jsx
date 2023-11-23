import React, { useEffect, useState } from "react";
import * as ST from "./style";
import { postGoods, getGoods, patchGoods } from "../../api/goods";
import { useMutation } from "react-query";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

const Product = (props) => {
  //제품글 올리기
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const onChangeTitleHandler = (e) => {
    setTitle(e.target.value);
  };
  const onChangePriceHandler = (e) => {
    setPrice(e.target.value);
  };
  const onChangeDescHandler = (e) => {
    setDesc(e.target.value);
  };

  //input에 url 직접 넣기
  const [imgFile, setImgFile] = useState("");
  const onChangeInputImgHandler = (e) => {
    setImgFile(e.target.value);
  };

  //수정하기
  const [editImage, setEditImage] = useState("");
  const [editPrice, setEditPrice] = useState(0);
  const onChangeEditHandler = (e) => {
    setEditPrice(e.target.value);
  };
  const onChangeEditInputImgHandler = (e) => {
    setEditImage(e.target.value);
  };

  //현재 클릭한 제품에 대한 정보를 받와야함.
  const { data: items } = useQuery("getGoods", getGoods);

  // 수정페이지 useLocation으로 id 정보 받기
  const { state: item } = useLocation();
  // console.log("items", items); //전체 아이템
  // console.log("item", item); //2

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await getGoods();
  //       // 데이터를 가져온 후에 state 업데이트
  //       setItems(response.data.data);
  //     } catch (error) {
  //       // 에러 처리
  //       console.error("Error fetching data: ", error);
  //     }
  // }, []);
  const fountData = items?.find((a) => a.goodsId === item?.id);

  //버튼 누른거 필터링 시키기
  // console.log("fountData", fountData);

  //이미지 리사이징 할까말까....

  //이미지 업로드 - 파일 읽고 주소 저장
  // const onChangeImgUploadHandler = (e) => {
  //   const file = e.target.files?.[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setImgFile(reader.result);
  //   };
  // };

  //usertype get
  // const { isLoading, isSuccess, data } = useQuery("getGoods", getGoods);
  // // useLocation()
  // console.log("data", data);
  // const param = useParams();
  // // console.log(data.filter((a)=>))
  // console.log(param);
  // console.log("userType", data.userType);

  //글 작성 post 보내기
  //현재 postGoods 통신오류 남.. 500 -> 해결
  const boardMutation = useMutation(postGoods, {
    onSuccess: () => {
      console.log("boardMutation 성공하였습니다.");
      alert("등록되었습니다.");
    },
  });

  const newContent = {
    goodsName: title,
    imageUrl: imgFile,
    price: parseInt(price),
    content: desc,
    // likeCount: 1,
  };

  const postBoardHandler = () => {
    boardMutation.mutate(newContent);
  };
  //
  //글 수정 post 보내기
  const EditMutation = useMutation(patchGoods, {
    onSuccess: () => {
      alert("수정완료입니다.");
    },
  });

  const editDetail = {
    goodsName: fountData?.goodsName,
    imageUrl: editImage,
    price: parseInt(editPrice),
    content: desc,
  };

  console.log("editDetail", editDetail);

  const onClickEditHandler = (id) => {
    EditMutation.mutate({ id, editDetail });
  };

  return (
    <ST.ProductContainerDiv>
      <h1 className="ProductTitleH1">{props.top}</h1>

      <ST.ProductAttatchmentDiv>
        <ST.ProductAttatchInputBox>
          {props.top === "글 수정" ? (
            <input
              type="text"
              value={editImage}
              onChange={onChangeEditInputImgHandler}
            ></input>
          ) : (
            <input
              type="text"
              value={imgFile}
              onChange={onChangeInputImgHandler}
            ></input>
          )}

          {/* <input
            className="ProductAttatchmentInput"
            type="file"
            // accept="image/*"
            onChange={onChangeImgUploadHandler}
            ref={imgRef}
          /> */}
        </ST.ProductAttatchInputBox>
        {props.top === "글 수정" ? (
          editImage ? (
            <img src={editImage} alt="프로필 이미지"></img>
          ) : (
            <img src={fountData?.imageUrl} alt="프로필 이미지"></img>
          )
        ) : (
          <img src={imgFile} alt="프로필 이미지"></img>
        )}
      </ST.ProductAttatchmentDiv>
      <ST.ProductInfoContainerDiv>
        <ST.ProductInfoFlexDiv>
          <ST.ProductInfoDiv>
            <ST.ProductDetailDiv>
              <ST.H4>제품명:</ST.H4> &nbsp;&nbsp;
              {props.top === "글 수정" ? (
                fountData?.goodsName
              ) : (
                <input value={title} onChange={onChangeTitleHandler} />
              )}
            </ST.ProductDetailDiv>
            <ST.ProductDetailDiv>
              <ST.H4>가격:</ST.H4> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {props.top === "글 수정" ? (
                <input
                  value={editPrice}
                  onChangeCapture={onChangeEditHandler}
                  placeholder={fountData?.price}
                  onChange={onChangePriceHandler}
                />
              ) : (
                <input value={price} onChange={onChangePriceHandler} />
              )}
            </ST.ProductDetailDiv>
          </ST.ProductInfoDiv>
          {props.top === "글 수정" ? (
            <ST.ProductUploadBtn
              onClick={() => onClickEditHandler(fountData?.goodsId)}
            >
              수정!
            </ST.ProductUploadBtn>
          ) : (
            <ST.ProductUploadBtn onClick={postBoardHandler}>
              올리기!
            </ST.ProductUploadBtn>
          )}
        </ST.ProductInfoFlexDiv>
        <ST.ProductDescDiv>
          <h4>설명</h4>

          <ST.ProductTextarea value={desc} onChange={onChangeDescHandler} />
        </ST.ProductDescDiv>
      </ST.ProductInfoContainerDiv>
    </ST.ProductContainerDiv>
  );
};

export default Product;
