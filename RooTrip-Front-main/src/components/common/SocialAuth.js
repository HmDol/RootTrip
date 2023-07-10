import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { socialLogin } from '@services/auth';
import { setToken } from '@store/auth-store';
import { setRefreshToken } from '@utils/authCookie';

const SocialAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { provider } = useParams();
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await socialLogin(provider, code);
        const { accessToken, expire, refreshToken } = token;

        setRefreshToken(refreshToken);
        dispatch(setToken({ accessToken, expire }));
        navigate('/');
      } catch (e) {
        alert(e.message);
      }
    };

    getToken();
    // 의존성 배열을 제거함으로써 두 번 발생하는 에러 해결
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default SocialAuth;
