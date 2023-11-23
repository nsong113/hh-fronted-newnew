import React, { useState } from "react";
import CommentDetail from "./CommentDetail";
import * as ST from "./style";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  plusComment,
  patchComment,
  deleteComment,
  readComment,
} from "../../api/goods";
import { useLocation } from "react-router-dom";
//
const Comment = (id) => {
  //클릭한 아이템
  const { state: item } = useLocation(); //{id:2}

  //textarea state관리
  const [addComment, setAddcomment] = useState("");
  const onChangeInputHandler = (e) => {
    setAddcomment(e.target.value);
  };

  //수정 state 관리  -> 아직 안사용함
  const [EditComment, setEditComment] = useState("");

  //댓글 조회
  const { data } = useQuery("readComment", readComment);
  // * 오류 * Comments
  // console.log("readComment", data.Comments); //* 인증 인가 오류 -인가가 필요 없는데 인가를 요청함*

  //댓글 추가
  const queryClient = useQueryClient();
  const addCommentMutation = useMutation(plusComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("readComment");
    },
  });

  const onClickAddCommentHandler = (id) => {
    addCommentMutation.mutate({ id, addComment });
  };

  //업데이트
  const patchCommentMutation = useMutation(patchComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("readComment");
    },
  });

  const onClickPatchCommentHandler = (id) => {
    patchCommentMutation.mutate({ id, EditComment });
  };

  //삭제
  const deleteCommentMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("addComment");
      //invalidate
    },
  });

  return (
    <ST.CommentContainerDiv>
      <h2 className="CommentTitleH2" style={{ marginBottom: "30px" }}>
        Comment
      </h2>
      <ST.CommentInputAreaDiv>
        <textarea
          style={{ width: "80%", height: "100px", padding: "20px" }}
          value={addComment}
          placeholder="댓글을 입력하세요"
          onChange={onChangeInputHandler}
        />

        {/* 여기 goodsId를 어디서 가져오는 건지 모르겠음.. 근데 일단 된다고는 하니까 연결 해보고 확인 */}
        <ST.CommentButton
          onClick={() => onClickAddCommentHandler(data.goodsId)}
        >
          댓글추가하기
        </ST.CommentButton>
      </ST.CommentInputAreaDiv>
      <ST.CommentResultContainer className="abc">
        {/* 오류  일단 Comment 문제를 해결 해야 해결 가능 */}
        {/* {data.Comments && */}
        {/* data.Comments.map((item) => { */}
        {/* return ( */}
        <CommentDetail
          onClickPatchCommentHandler={onClickPatchCommentHandler}
          EditComment={EditComment}
          setEditComment={setEditComment}
        />
        {/* ); */}
        {/* })} */}
      </ST.CommentResultContainer>
    </ST.CommentContainerDiv>
  );
};

export default Comment;
