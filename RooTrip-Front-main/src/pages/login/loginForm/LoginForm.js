import { useCallback, useRef, useState } from 'react';

import LoginButton from './LoginButton';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordRef = useRef();

  const onChangeEmailHandler = useCallback((e) => setEmail(e.target.value), []);
  const onChangePasswordHandler = useCallback(
    (e) => setPassword(e.target.value),
    [],
  );

  // 회원가입시
  const handleSubmit = useCallback(
    (e) => {
      // 페이지 이동 막기
      e.preventDefault();

      // 상위 컴포넌트로 로그인 정보 전달
      onLogin({ email, password });

      setPassword('');
      passwordRef.current.focus();
    },
    [onLogin, email, password],
  );

  return (
    <form className='login_index' method='post' onSubmit={handleSubmit}>
      <input
        className='logintext'
        name='email'
        value={email}
        placeholder='사용자 이메일 또는 아이디'
        onChange={onChangeEmailHandler}
      />
      <input
        ref={passwordRef}
        className='logintext'
        type='password'
        name='password'
        value={password}
        placeholder='비밀번호'
        onChange={onChangePasswordHandler}
      />

      <LoginButton />
    </form>
  );
};

export default Login;
