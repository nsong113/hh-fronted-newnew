import styled from "styled-components";

export const HeaderBoxDiv = styled.div`
  width: 100%;
  height: 10vh;
  background-color: #ead2d4;
`;

export const HeaderContainerDiv = styled.div`
  width: 80%;
  height: 10vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderFlexDiv = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderUtilDiv = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderTitleH1 = styled.h1`
  font-size: 30px;
`;

export const HeaderUtilContentP = styled.p`
  font-size: 21px;
  color: #b8c6d5;
`;

export const HeaderUtilContent = styled.p`
  cursor: pointer;
  text-decoration: underline;
  margin: 0 10px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
