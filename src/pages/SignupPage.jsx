import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import * as Styled from "../component/Signup/style";
import Header from "../component/Header/Header";
import Footer from "../component/Footer/Footer";
import axios from 'axios';


const Join = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const registerMutation = useMutation(
    async ({ loginId, password, nickname }) => {
      try {
        const response = await axios.post('http://tonadus.shop:3000/signup', {
          loginId,
          password,
          nickname,
        });
        console.log('요청:', response.data);
        return response.data;
      } catch (error) {
        console.error('회원가입 에러:', error);
        throw error;
      }
    }
  );

  const onJoinHandler = async () => {
    try {
      if (!loginId) {
        alert('아이디를 입력해주세요.');
        return;
      }
  
      if (!password) {
        alert('비밀번호를 입력해주세요.');
        return;
      }
  
      if (!nickname) {
        alert('닉네임을 입력해주세요.');
        return;
      }

      if (loginId === password) {
        alert('아이디와 비밀번호는 같을 수 없습니다.');
        return;
      }
  
      if (password.length < 8) {
        alert('비밀번호는 최소 8자 이상이어야 합니다.');
        return;
      }

      const response = await registerMutation.mutateAsync({ loginId, password, nickname });
      const token = response.token;
      document.cookie = `token=${token}; path=/`;
    } catch (error) {
      console.error('회원가입 에러:', error);
      if (error.response) {
        if (error.response.status === 400) {
          if (error.response.data.message === '데이터 형식이 올바르지 않습니다.') {
            alert('데이터 형식이 올바르지 않습니다.');
          } else if (error.response.data.message === '닉네임 형식에 일치하지 않습니다.') {
            alert('닉네임 형식에 일치하지 않습니다.');
          } else if (error.response.data.message === '비밀번호 형식에 일치하지 않습니다.') {
            alert('비밀번호 형식에 일치하지 않습니다.');
          } else if (error.response.data.message === '중복된 닉네임입니다.') {
            alert('중복된 닉네임입니다.');
          } else {
            alert('예기치 않은 오류가 발생했습니다.');
          }
        } else if (error.response.status === 409) {
          alert('중복된 USER ID입니다.');
        } else {
          console.log('예기치 않은 오류가 발생했습니다.');
        }
      } else {
        console.log('예기치 않은 오류가 발생했습니다.');
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
          <Styled.Input type="text" id="loginId" value={loginId} onChange={(e) => setLoginId(e.target.value)} />

          <Styled.Label htmlFor="password">Password:</Styled.Label>
          <Styled.Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Styled.Label htmlFor="nickname">Nickname:</Styled.Label>
          <Styled.Input type="text" id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />

          <Styled.Button type="button" onClick={onJoinHandler} disabled={registerMutation.isLoading}>
            {registerMutation.isLoading ? 'Joining...' : 'Join!'}
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
