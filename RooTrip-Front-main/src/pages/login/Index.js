import React from 'react';
import loadable from '@loadable/component';

import Account from './Account';
import LoginContainer from './LoginContainer';
import LoginSocial from './LoginSocial';
import LoginTitle from './LoginTitle';
import '@styles/login/login.scss';

const Map = loadable(() => import('@components/map/Map'));

const Index = () => (
  <div className='map-container'>
    <div className='whole_page'>
      <div className='pages'>
        <div className='LoginPage'>
          <LoginTitle />
          <LoginContainer />
          <LoginSocial />
        </div>
        <div className='AccountPage'>
          <Account />
        </div>
      </div>
    </div>
    <Map />
  </div>
);

export default Index;
