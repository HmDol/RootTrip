import React from 'react';
import { Link } from 'react-router-dom';
import loadable from '@loadable/component';

const FindAccount = loadable(() => import('@pages/account/Index'));
const Register = loadable(() => import('@pages/register/Index'));

const Account = () => (
  <>
    <div className='account-box'>
      <Link to='/account' onMouseEnter={() => FindAccount.preload()}>
        <span>비밀번호를 잊으셨나요?</span>
      </Link>
    </div>
    <div className='register-box'>
      <span>계정이 없으신가요?</span>

      <Link to='/register' onMouseEnter={() => Register.preload()}>
        <button type='button' className='gosignupbtn'>
          회원 가입
        </button>
      </Link>
    </div>
  </>
);

export default Account;
