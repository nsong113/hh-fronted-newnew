import styled from 'styled-components';

const Container = styled.div`
max-width: 400px;
margin: 17px auto;
width: 80%;
height: 60vh;
display: grid;
`;

const Form = styled.form`
display: flex;
flex-direction: column;
margin: 0;

`;

const Label = styled.label`
margin-bottom: 5px;

`;

const Select = styled.select`
height: 40px;
`


const Input = styled.input`
padding: 8px;
font-size: 14px;
border: 1px solid #ccc;
border-radius: 4px;
width: 100%;
box-sizing: border-box;
height: 5vh;
margin: 7px 0;
`;

const Button = styled.button`
padding: 10px;
font-size: 16px;
background-color: #b8c6d5;
color: #fff;
border: none;
border-radius: 4px;
cursor: pointer;
margin: 7px 0;


&:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
`;

const LinkText = styled.p`
margin-top: 15px; 
font-weight: bold;
`;

export const ErrorContainer = styled.div`
  margin-top: 10px;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 14px;
`;

export { Container, Form, Label, Input, Button, LinkText, Select };