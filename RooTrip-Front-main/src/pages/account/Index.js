import React from 'react';

import Title from '@components/wrapper/Title';
import TOC from '@components/wrapper/TOC';
import { accountTable } from '@constants/table';
import AccountContainer from './AccountContainer';
import '@styles/components/title.scss';

const FindAccount = () => (
  <>
    <Title title='Find Password' className='registerTitle' />
    <div>
      <TOC table={accountTable} />
      <AccountContainer />
    </div>
  </>
);

export default FindAccount;
