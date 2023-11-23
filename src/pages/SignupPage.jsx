// Frontend Component
import React, { useState } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import * as Styled from "../component/Signup/style";
import Header from "../component/Header/Header";
import Footer from "../component/Footer/Footer";
import axios from "axios";

const BUYER = "BUYER";
const SELLER = "SELLER";
//
const Join = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [userType, setUserType] = useState("");

  const registerMutation = useMutation(
    async ({ loginId, password, nickname, userType = ["BUYER", "SELLER"] }) => {
      try {
        const response = await axios.post(
          "http://43.200.49.63:3000/api/signup",
          {
            loginId,
            password,
            nickname,
            userType,
          }
        );
        console.log("Response:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error during signup:", error);
        throw error;
      }
    }
  );

  const onJoinHandler = async () => {
    try {
      const response = await registerMutation.mutateAsync({
        loginId,
        password,
        nickname,
        userType,
      });
      const token = response.token;
      document.cookie = `token=${token}; path=/`;
    } catch (error) {
      console.error("Error during signup:", error);
      if (error.response) {
        if (error.response.status === 400) {
          console.log("입력값이 올바르지 않습니다.");
        } else if (error.response.status === 409) {
          console.log("중복된 USER ID입니다.");
        } else {
          console.log("An unexpected error occurred.");
        }
      } else {
        console.log("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      <Header />
      <Styled.Container>
        <h2>Join</h2>
        <Styled.Form>
          <Styled.Label htmlFor="loginId">ID:</Styled.Label>
          <Styled.Input
            type="text"
            id="loginId"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />

          <Styled.Label htmlFor="password">Password:</Styled.Label>
          <Styled.Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Styled.Label htmlFor="nickname">Nickname:</Styled.Label>
          <Styled.Input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />

          <Styled.Label htmlFor="userType">User Type:</Styled.Label>
          <Styled.Select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="">Select User Type</option>
            <option value={BUYER}>BUYER</option>
            <option value={SELLER}>SELLER</option>
          </Styled.Select>

          <Styled.Button
            type="button"
            onClick={onJoinHandler}
            disabled={registerMutation.isLoading}
          >
            {registerMutation.isLoading ? "Joining..." : "Join!"}
          </Styled.Button>

          <Styled.LinkText>
            이미 계정이 있으신가요? <Link to="/login">로그인</Link>
          </Styled.LinkText>
        </Styled.Form>
      </Styled.Container>
      <Footer />
    </>
  );
};

export default Join;
