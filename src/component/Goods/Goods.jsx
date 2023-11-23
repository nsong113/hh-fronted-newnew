import React, { useEffect, useState } from "react";
import * as ST from "./style";
import Item from "./Item";
import { useQuery } from "react-query";
import { getGoods } from "../../api/goods";
//맨처음에 받아오는 axios data값은 무조건 undefined임 . 이거를 컨트롤해줘야함. isSuccess->true일 때 데이터 처리

const Goods = () => {
  //goods data get
  const { isLoading, isSuccess, data: goods } = useQuery("getGoods", getGoods);

  useEffect(() => {
    setFilteredItem(goods);
  }, [goods]);
  //
  //필터기능 input state 관리
  const [filterInput, setFilterInput] = useState("");

  //필터 적용된 아이템 state 저장 -> props로 넘겨주기
  const [filteredItem, setFilteredItem] = useState([]);

  //데이터 (goods)가 새로 갱신될 때 마다 && goods가 있을 때 마다 (동기처리) filteredItem에 set
  useEffect(() => {
    goods && setFilteredItem(goods);
  }, [goods]);

  //필터 버튼 클릭 핸들러
  const onClickFilterHandler = () => {
    const filtered = goods.filter((item) => {
      const inputLowerCase = filterInput.toLowerCase();
      return item.goodsName.toLowerCase().includes(inputLowerCase);
    });
    //필터된 아이템을 set
    setFilteredItem(filtered);
  };

  return (
    <ST.Goods>
      <ST.GoodsFilterDiv>
        <p>원하는 정보 바로 찾기:</p>
        <input
          type="text"
          value={filterInput}
          onChange={(e) => {
            setFilterInput(e.target.value);
          }}
        />
        &nbsp; <button onClick={onClickFilterHandler}> 찾기!</button>
      </ST.GoodsFilterDiv>
      <div className="GoodsProductDiv">
        <ST.GoodsTitleDiv>
          <h1>Featured Products</h1>
          <p>Discover our amazing selection of bakery and dessert items.</p>
        </ST.GoodsTitleDiv>

        {/* 각 아이템 컴포넌트 */}
        {/* 필터된 아이템 전송 */}
        <ST.GoodsItemFlexBox>
          <Item
            filteredItem={filteredItem}
            isSuccess={isSuccess}
            isLoading={isLoading}
          />
        </ST.GoodsItemFlexBox>
      </div>
    </ST.Goods>
  );
};

export default Goods;
