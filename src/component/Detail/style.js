import { styled } from "styled-components";

export const InfoContainer = styled.div`
  width: 80%;
  height: 120vh;
  margin: 30px auto;
`;

export const InfoTitleBox = styled.div`
  width: 100%;
  height: 80%;
`;
//
export const InfoFlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const InfoItemBox = styled.div`
  width: 100%;
  height: 20%;
  margin-top: 30px;
`;

export const InfoAddBttn = styled.div`
  width: 180px;
  height: 50px;
  background-color: #ead2d4;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
`;

////////코멘트 스타일링
export const CommentContainerDiv = styled.div`
  width: 100%;
  height: 60vh;
  margin: 80px auto;
  text-align: center;
`;

export const CommentInputAreaDiv = styled.div`
  width: 80%;
  height: 180px;
  margin: 0 auto;
  background-color: #ead2d4;
  padding: 20px;
  position: relative;
`;

export const CommentButton = styled.div`
  width: 100px;
  height: 40px;
  background-color: white;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 10px;
  bottom: 10px;
`;

export const CommentResultContainer = styled.div`
  width: 80%;
  margin: 30px auto;
  min-height: 80px;
  border: 1px solid #ddd;
  padding: 0 10px;
  line-height: 80px;
  display: flex;
  align-items: center;
  line-height: 1.4;
`;
///코멘트 디테일 스타일링

export const CommentDetailFlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
