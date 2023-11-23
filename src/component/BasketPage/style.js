import styled from "styled-components";


export const Button = styled.button`
  background-color: #B8C6D5; 
  color: white; 
  padding: 10px 20px;
  margin: 8px; 
  border: none; 
  border-radius: 4px; 
  cursor: pointer;
  font-size: 14px; 
  transition: background-color 0.3s; 

  &:hover {
    background-color: #45a049; 
  }
`;


export const ImgDiv = styled.div`
width: 100px;
height: 100px; 
background-size: cover;
background-position: center;
border-radius: 8px;
margin-bottom: 10px;
display: grid;

`;

export const StyledButtonContainer = styled.div`
    display: flex;
    gap: 10px;  
`;

export const Main = styled.div`
  height: 85vh;
`;
