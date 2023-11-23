import React from "react";
import * as ST from "./style";
import { useQuery } from "react-query";
import { readComment } from "../../api/goods";

const CommentDetail = ({
  onClickPatchCommentHandler,
  EditComment,
  setEditComment,
}) => {
  //detail 조회
  const { data } = useQuery("readComment", readComment);
  //
  return (
    // 댓글 map 아직 안시킴.
    //css도 map 크기에 따라 달라지게 아직 설정 안함
    <ST.CommentDetailFlexBox>
      {/* * 오류 Comments * */}
      {/* <p>{data.Comments.comment}</p> */}
      <div className="CommentDetailButtonFlexBox">
        <button onClick={() => onClickPatchCommentHandler(data.goodsId)}>
          댓글수정
        </button>{" "}
        &nbsp;
        <button>댓글삭제</button>
      </div>
    </ST.CommentDetailFlexBox>
  );
};

export default CommentDetail;
