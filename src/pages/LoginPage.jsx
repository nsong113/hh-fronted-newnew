// 로그인 페이지
import React, { useState } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import * as Styled from "../component/Signup/style";
import Header from "../component/Header/Header";
import Footer from "../component/Footer/Footer";
import axios from "axios";
//
function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginMutation = useMutation(async ({ loginId, password }) => {
    try {
      const response = await axios.post("http://43.200.49.63:3000/api/login", {
        loginId,
        password,
      });

      // Assuming your token is in the response.data.token
      const token = response.data.token;

      console.log("Login Response:", response.data);

      return { userData: response.data, token };
    } catch (error) {
      console.log("Login Error:", error);
      throw error;
    }
  });

  const onLoginHandler = async () => {
    if (!loginId || !password) {
      setError("ID and password are required.");
      return;
    }

    setError("");
    try {
      const { userData, token } = await loginMutation.mutateAsync({
        loginId,
        password,
      });

      console.log("User data after login:", userData);

      document.cookie = `token=${token}; path=/`;
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response && error.response.status === 401) {
        setError("Invalid credentials. Please check your ID and password.");
      } else {
        setError("An unexpected error occurred during login.");
      }
    }
  };

  return (
    <>
      <Header />
      <Styled.Container>
        <h2>Login</h2>
        <Styled.Form>
          {error && (
            <Styled.ErrorContainer>
              <Styled.ErrorText>{error}</Styled.ErrorText>
            </Styled.ErrorContainer>
          )}

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

          <Styled.Button
            type="button"
            onClick={onLoginHandler}
            disabled={loginMutation.isLoading}
          >
            {loginMutation.isLoading ? "Logging in..." : "Login"}
          </Styled.Button>

          <Styled.LinkText>
            계정이 없으신가요? <Link to="/signup">회원가입</Link>
          </Styled.LinkText>
        </Styled.Form>
      </Styled.Container>
      <Footer />
    </>
  );
}

export default Login;
