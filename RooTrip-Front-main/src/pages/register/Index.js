import React from 'react';

import Title from '@components/wrapper/Title';
import TOC from '@components/wrapper/TOC';
import { registerTable } from '@constants/table';
import RegisterContainer from './RegisterContainer';
import '@styles/components/title.scss';
import '@styles/register/register.scss';

const Index = () => (
  <>
    <Title title='JOIN MEMBERS' className='registerTitle' />
    <div className='Register_main'>
      <TOC table={registerTable} />
      <RegisterContainer />
    </div>
  </>
);

export default Index;
