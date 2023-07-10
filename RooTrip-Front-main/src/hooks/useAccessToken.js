import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { reIssue } from '@services/auth';
import { setToken } from '@store/auth-store';
import { getRefreshToken } from '@utils/authCookie';

const useAccessToken = (accessToken, expireTime) => {
  const timer = useRef(null);
  const refreshToken = getRefreshToken();
  const dispatch = useDispatch();

  useEffect(() => {
    const tokenReIssue = async () => {
      try {
        const token = await reIssue(refreshToken);
        dispatch(setToken(token));
      } catch (e) {
        // 토근 발급 실패시에는 경고 메시지 X
      }
    };

    if (accessToken) {
      timer.current = setTimeout(() => {
        tokenReIssue();
      }, expireTime); // expireTime까지의 시간
    }

    // 강제 렌더링
    if (!accessToken && refreshToken) tokenReIssue();

    return () => clearInterval(timer.current);
  }, [accessToken, dispatch, expireTime, refreshToken]);
};

export default useAccessToken;
