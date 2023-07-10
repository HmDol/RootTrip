import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import AccountForm from './AccountForm';

const AccountContainer = () => {
  const navigate = useNavigate();

  const changePassword = useCallback(() => {
    alert('임시 비밀번호를 전송하였습니다.');

    navigate('/');
  }, [navigate]);

  return <AccountForm changePassword={changePassword} />;
};

export default AccountContainer;
