import { useCallback, useRef, useState } from 'react';
import cn from 'classnames';
import styled from 'styled-components';

import Input from '@components/wrapper/Input';
import Button from '@components/wrapper/Button';
import useTimer from '@hooks/useTimer';
import { sendVerifyNumber, authVerifyNumber } from '@services/email';
import validate from '@utils/validation';

const StyledRegisterEmailAuth = styled.div`
  .input-register_form {
    .x-ray {
      opacity: 0.5;
      cursor: auto;
    }

    .Certi_email_btn {
      margin-left: 30px;
      height: 40px;
      width: 100px;
      font-weight: bold;
      font-size: 15px;
      color: white;
      background: rgb(72, 72, 196);
      border: 1px solid rgb(72, 72, 196);
      box-shadow: 3px 3px 1px 0px #ccc;
      cursor: pointer;
    }

    .Certi_email_Num {
      position: relative;

      .input_certi_email_Num {
        width: 150px;
        height: 45px;
        border-radius: 10px;
        margin-bottom: 25px;
        font-size: 15px;
        padding-left: 15px;
        border: 1px solid #ccc;
        background-color: #efefef;
      }
      .Certi_Timer {
        position: absolute;
        color: #0055ff;
        margin-left: 48px;
      }
      .Certi_email_btn {
        margin-left: 165px;
      }
    }

    input {
      width: 285px;
      height: 45px;
      border-radius: 10px;
      margin-bottom: 25px;
      font-size: 15px;
      padding-left: 15px;
      border: 1px solid #ccc;
      background-color: #efefef;
    }
    span {
      letter-spacing: -1px;
      margin: 15px;
      font-weight: bold;
    }
  }
`;

const RegisterEmailAuth = ({
  type,
  email,
  onInput,
  setValidation,
  setVerifyNumber,
}) => {
  // 타이머
  const { time, isActive, isCompleted, startTimer, resetTimer } = useTimer();

  // 인증번호
  const [number, setNumber] = useState('');

  // 인증번호가 전송되었는지 확인하기 위한 변수 (인증번호)
  const [isSend, setIsSend] = useState(false);

  // 인증번호 재발신 횟수
  const [resendCount, setResendCount] = useState(0);

  // 인증번호가 전송되었는지 확인하기 위한 변수 (이메일 입력)
  const endEmail = useRef(false);

  // 인증번호 재발신 횟수가 Max인지 확인하기 위한 변수
  const isMaxCount = useRef(false);

  const handleNumber = useCallback((e) => {
    setNumber(e.target.value);
  }, []);

  // 인증 번호 발신
  const sendEmail = useCallback(async () => {
    // 유효성 검사
    const { error } = await validate('email', email);

    if (error) {
      alert(error);
      return;
    }

    // 에러가 발생하지 않았다면,
    try {
      if (isSend) return;

      const status = sendVerifyNumber(type, email);

      // 이메일 전송이 완료되었다면,
      if (status) {
        alert('인증번호가 전송되었습니다.');

        // 타이머 시작
        startTimer();

        // 인증번호 입력 활성화
        setIsSend(true);

        // 이메일 입력 비활성화
        endEmail.current = true;
      }
    } catch (e) {
      // error
      alert(e.message);
    }
  }, [type, email, isSend, startTimer]);

  // 인증 번호 재발신
  const resendEmail = useCallback(() => {
    if (resendCount >= 3) {
      alert('재발신 횟수를 초과하였습니다.');
      isMaxCount.current = true;
      return;
    }

    setResendCount((prevResendCount) => prevResendCount + 1);

    // 타이머 초기화
    resetTimer();

    // 인증번호 재전송
    sendEmail();
  }, [sendEmail, resendCount, resetTimer]);

  // 인증 번호 확인
  const handleVerifyNumber = useCallback(async () => {
    // 시간이 만료되었다면,
    if (isCompleted) {
      alert('시간이 만료되었습니다.');
      return;
    }

    if (number.length <= 0) {
      alert('인증 번호를 입력해주세요.');
      return;
    }

    try {
      await authVerifyNumber(email, number);

      // 성공 시
      alert('인증번호가 확인되었습니다.');
      setValidation((validation) => ({
        ...validation,
        email: true,
      }));
      if (setVerifyNumber) setVerifyNumber(number);
      setIsSend(false);
      resetTimer();
    } catch (e) {
      alert('인증번호가 일치하지 않습니다.');
    }
  }, [email, setValidation, setVerifyNumber, number, isCompleted, resetTimer]);

  return (
    <StyledRegisterEmailAuth>
      <div className='input-register_form'>
        <Input
          className={cn({ 'x-ray': endEmail.current })}
          name='email'
          value={email}
          onChange={onInput}
          placeholder='email을 형식에 맞게 입력해주세요'
          disabled={endEmail.current}
        />
        {!isSend ? (
          <Button
            type='button'
            className={cn('Certi_email_btn', { 'x-ray': endEmail.current })}
            onClick={sendEmail}
            content='발신'
            disabled={endEmail.current}
          />
        ) : (
          <Button
            type='button'
            className='Certi_email_btn'
            onClick={resendEmail}
            content='재발신'
            disabled={isMaxCount.current}
          />
        )}
      </div>
      <div className='input-register_form'>
        <div className='Certi_email_Num'>
          <Input
            className={cn('input_certi_email_Num', { 'x-ray': !isSend })}
            name='number'
            placeholder='인증번호 입력'
            value={number}
            onChange={handleNumber}
            disabled={!isSend}
          />
          <span className='Certi_Timer'>
            {isActive &&
              `${Math.floor(time / 60)
                .toString()
                .padStart(2, '0')}:${Math.floor(time % 60)
                .toString()
                .padStart(2, '0')}`}
          </span>
          <Button
            type='button'
            className={cn('Certi_email_btn', { 'x-ray': !isSend })}
            onClick={handleVerifyNumber}
            content='인증하기'
            disabled={!isSend}
          />
        </div>
      </div>
    </StyledRegisterEmailAuth>
  );
};

export default RegisterEmailAuth;
