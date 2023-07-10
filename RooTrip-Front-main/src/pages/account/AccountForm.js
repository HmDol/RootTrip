import { useCallback, useState } from 'react';

import RegisterEmailAuth from '@pages/register/registerForm/RegisterEmailAuth';
import { sendPassword } from '@services/email';
import '@styles/account/account.scss';

const AccountForm = ({ changePassword }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [validation, setValidation] = useState(false);
  const [verifyNumber, setVerifyNumber] = useState('');

  const onInput = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handleChangePassword = useCallback(
    async (e) => {
      e.preventDefault();

      // 페이지 이동
      if (!validation || isLoading) return;
      setIsLoading(true);

      try {
        // 임시 비밀번호 전송
        await sendPassword(email, verifyNumber);
        await changePassword();

        setEmail('');
        setValidation('');
      } catch (error) {
        alert(error.message);
      }

      setIsLoading(false);
    },
    [changePassword, isLoading, email, verifyNumber, validation],
  );

  return (
    <div className='account-form'>
      <RegisterEmailAuth
        type={'account'}
        email={email}
        onInput={onInput}
        setValidation={setValidation}
        setVerifyNumber={setVerifyNumber}
      />
      <button
        type='submit'
        className={validation ? 'check_btn' : 'Ncheck_btn'}
        disabled={!validation}
        onClick={handleChangePassword}
      >
        변경하기
      </button>
    </div>
  );
};

export default AccountForm;
