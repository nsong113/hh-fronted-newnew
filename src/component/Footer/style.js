import styled from "styled-components";

// export const FooterBoxDiv = styled.div`
//   width: 100%;
//   height: 38vh;
//   text-align: center;
//   background-color: #ead2d4;
// `;

// export const FooterContainerDiv = styled.div`
//   width: 80%;
//   height: 30vh;

//   margin: 0 auto;
//   font-size: 16px;
//   padding: 20px;
// `;

export const FooterBoxDiv = styled.div`
  width: 100%;
  bottom: 0;
  min-height: 30vh;
  text-align: center;
  background-color: #ead2d4;
`;

export const FooterContainerDiv = styled.div`
  width: 80%;
  min-height: 30vh;

  margin: 0 auto;
  font-size: 16px;
  padding: 20px;
`;

export const FooterInfoDiv = styled.div`
  width: 30%;
  margin: 0 auto;
  height: 60%;

  p {
    margin-bottom: 17px; 
  }
`;
export const FooterSNSContainerDiv = styled.div`
  width: 35%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FooterSNSDiv = styled.div`
  width: 35px;
  height: 35px;
  border: 1px solid #999;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
