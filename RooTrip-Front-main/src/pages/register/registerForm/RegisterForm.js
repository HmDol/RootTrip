import { useCallback, useState } from 'react';
import cn from 'classnames';

import Input from '@components/wrapper/Input';
import Button from '@components/wrapper/Button';
import {
  PASSWORD_REQUIRED_ERROR,
  PASSWORD_MISMATCH_ERROR,
} from '@constants/error';
import { regExpSpace } from '@constants/regExp';
import useInitialState from '@hooks/useInitialState';
import useValidateForm from '@hooks/useValidateForm';
import showError from '@utils/showError';
import RegisterButton from './RegisterButton';
import RegisterEmailAuth from './RegisterEmailAuth';

const RegisterForm = ({ onRegister }) => {
  const [form, setForm, resetForm] = useInitialState({
    name: '',
    gender: 'M',
    email: '',
    nickname: '',
    password: '',
    password2: '',
  });
  const [validation, setValidation, validateForm] = useValidateForm({
    name: false,
    email: false,
    nickname: '※ 한글, 영어, 숫자를 조합한 닉네임을 입력해주세요.',
    password: '※ 숫자, 영어, 특수문자를 포함해 8~16자리로 입력해주세요.',
    password2: '※ 위 입력한 비밀번호를 다시 입력해주세요.',
  });
  const [isLoading, setIsLoading] = useState(false);

  const onInput = useCallback(
    (e) => {
      if (!regExpSpace.test(e.target.value)) {
        setForm((prevForm) => ({
          ...prevForm,
          [e.target.name]: e.target.value,
        }));
      }
    },
    [setForm],
  );

  const confirmPassword = useCallback(
    (e) => {
      const prevPassword = form.password;

      if (validation.password !== true) {
        setValidation((prevValidation) => ({
          ...prevValidation,
          password2: PASSWORD_REQUIRED_ERROR,
        }));
      } else {
        const isConfirm = prevPassword === e.target.value;

        setValidation((prevValidation) => ({
          ...prevValidation,
          password2: isConfirm ? true : PASSWORD_MISMATCH_ERROR,
        }));
      }
    },
    [form.password, validation.password, setValidation],
  );

  const handleSubmit = useCallback(
    async (e) => {
      // 페이지 이동 막기
      e.preventDefault();
      if (isLoading) return;

      setIsLoading(true);

      const list = Object.keys(validation);
      const isValid = Object.values(validation);

      // 유효성 검사에 만족하지 못한게 하나라도 있다면,
      if (isValid.includes(false)) {
        setIsLoading(false);
        const key = isValid.indexOf(false);

        alert(showError(list[key]));
        return;
      }

      try {
        delete form.password2;

        // 상위 컴포넌트로 회원가입 정보 전달
        await onRegister(form);

        // form 상태 초기화
        resetForm();
      } catch (error) {
        // error
      }

      setIsLoading(false);
    },
    [onRegister, isLoading, validation, form, resetForm],
  );

  return (
    <form className='User_data' onSubmit={handleSubmit}>
      <div className='User_data_content'>
        <div className='input-register_form'>
          <Input
            name='name'
            value={form.name}
            onChange={onInput}
            onBlur={validateForm}
            placeholder='이름을 입력해주세요'
          />
          <div className='check_box'>
            <span className='check_sex'>
              <Button
                type='button'
                name='gender'
                value='M'
                className={cn({ checked: form.gender === 'M' })}
                onClick={onInput}
                content='남'
              />
            </span>
            <span className='check_sex'>
              <Button
                type='button'
                name='gender'
                value='W'
                className={cn({ checked: form.gender === 'W' })}
                onClick={onInput}
                content='여'
              />
            </span>
          </div>
        </div>
        <RegisterEmailAuth
          type={'register'}
          email={form.email}
          onInput={onInput}
          setValidation={setValidation}
        />
        <div className='input-register_form'>
          <Input
            name='nickname'
            value={form.nickname}
            onChange={onInput}
            onBlur={validateForm}
            placeholder='닉네임을 입력해주세요'
          >
            <p>{validation.nickname}</p>
          </Input>
        </div>
        <div className='input-register_form'>
          <Input
            className='password'
            type='password'
            name='password'
            value={form.password}
            onChange={onInput}
            onBlur={validateForm}
            placeholder='비밀번호를 입력해주세요'
          >
            <p>{validation.password}</p>
          </Input>
        </div>
        <div className='input-register_form'>
          <Input
            className='password2'
            type='password'
            name='password2'
            value={form.password2}
            onChange={onInput}
            onBlur={confirmPassword}
            placeholder='비밀번호를 한번 더 입력해주세요'
          >
            <p>{validation.password2}</p>
          </Input>
        </div>
      </div>

      <RegisterButton />
    </form>
  );
};

export default RegisterForm;
