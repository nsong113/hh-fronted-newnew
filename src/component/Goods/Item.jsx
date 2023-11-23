import React from "react";
import * as ST from "./style";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { addLike, deleteGoods } from "../../api/goods";

const Item = ({ filteredItem, isSuccess, isLoading }) => {
  const navigate = useNavigate();
  console.log("filteredItem", filteredItem);
  // console.log("filteredItem", filteredItem[0].goodsId);

  //userType 확인
  // const [userType, setUserType] = useState("BUYER");
  //
  // const { data } = useQuery("checkUserType", checkUserType);

  // useEffect(() => {
  //   if (data === "SELLER") {
  //     setUserType("SELLER");
  //   }
  // }, [data]);

  //디테일 페이지로 이동하기 => state값 id로 주기 (useLocation)
  const goToDetailHandler = (id) => {
    navigate(`/goods/${id}`, { state: { id } });
  };

  //addLike Mutation
  const queryClient = useQueryClient();
  const addLikeMutation = useMutation(addLike, {
    onSuccess: () => {
      queryClient.invalidateQueries("getGoods");
    },
  });

  //addLike Mutation 사용   => * 쿠키 에러 *
  const addLikeHandler = (e, id) => {
    e.stopPropagation();
    addLikeMutation.mutate(id);
  };

  //수정으로 가기
  const onClickModifyHandler = (e, id) => {
    e.stopPropagation();
    navigate(`/goods/${id}/content`, { state: { id } });
    console.log("id", id);
  };

  //삭제
  const deleteMutation = useMutation(deleteGoods, {
    onSuccess: () => {
      queryClient.invalidateQueries("getGoods");
    },
  });

  const onClickDeleteHandler = (e, id) => {
    e.stopPropagation();
    deleteMutation.mutate(id);
  };

  return (
    <>
      {/* 여기서 맵핑시키기 */}
      {!isLoading &&
        isSuccess &&
        filteredItem?.map((item) => {
          return (
            <ST.GoodsItemsDiv
              key={item.id}
              onClick={() => goToDetailHandler(item.goodsId)}
            >
              {console.log("item", item.goodsId)}
              <div>
                <ST.GoodsImgDiv
                  style={{ backgroundImage: `url(${item.imageUrl})` }}
                ></ST.GoodsImgDiv>

                <ST.GoodsItemInfoBoxDiv>
                  <div className="GoodsItemInfoDiv">
                    <h6>{item.goodsName}</h6>
                    <h4>{item.price}</h4>
                    <p onClick={(e) => addLikeHandler(e, item.goodsId)}>
                      🩷 {item.likeCount}
                    </p>
                  </div>

                  <ST.GoodsItemEditBtn
                    onClick={(e) => onClickModifyHandler(e, item.goodsId)}
                  >
                    수정
                  </ST.GoodsItemEditBtn>
                  <ST.GoodsItemEditBtn
                    onClick={(e) => onClickDeleteHandler(e, item.goodsId)}
                  >
                    삭제
                  </ST.GoodsItemEditBtn>
                </ST.GoodsItemInfoBoxDiv>
              </div>
            </ST.GoodsItemsDiv>
          );
        })}
    </>
  );
};

export default Item;
