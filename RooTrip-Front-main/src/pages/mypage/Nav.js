import React from 'react';
import { useSelector } from 'react-redux';

import MypageMenu from '@constants/mypageMenu';

const menuItems = [
  { id: MypageMenu.MODIFY, label: '개인정보 수정' },
  { id: MypageMenu.MYTRIP, label: '나의 여행' },
  { id: MypageMenu.LIKEDTRIP, label: '좋아한 여행' },
  { id: MypageMenu.SAVEDTRIP, label: '저장한 여행' },
  { id: MypageMenu.UNSIGNED, label: '회원 탈퇴' },
];

const Nav = ({ onClickMenu }) => {
  const mypageMenu = useSelector((state) => state.menu);

  return (
    <div className='navBar'>
      {menuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          className={`navBox ${mypageMenu === menuItem.id ? 'selected' : ''}`}
          onClick={() => {
            onClickMenu(menuItem.id);
          }}
        >
          <p>{menuItem.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Nav;
