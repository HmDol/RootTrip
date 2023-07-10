import React from 'react';

import LogoImage from '@assets/rooTrip/logo.png';

const Title = () => (
  <>
    <div>
      <img className='Login_logo' src={LogoImage} alt='로고 사진' />
    </div>
    <span className='Logotext'>
      <span className='text1'>여행의 재미를 더하는 </span>
      <span className='text2'>SNS</span>
    </span>
  </>
);

export default Title;
