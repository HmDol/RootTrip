import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import MyPageIcon from '@assets/menu/mypage.png';
import FriendIcon from '@assets/menu/friend.png';
import TripIcon from '@assets/menu/trip.png';
import RouteIcon from '@assets/menu/route.png';
import WriteIcon from '@assets/menu/write.png';
import Menu from '@constants/menu';
import { getPosts } from '@services/post';
import { loadMarkers, removePrevMarkers } from '@store/marker-store';
import '@styles/home/nav.scss';

const menuItems = [
  { id: Menu.FRIEND, label: '친구 게시글', icon: FriendIcon },
  { id: Menu.TRIP, label: 'Trip', icon: TripIcon },
  { id: Menu.ROUTE, label: 'Route', icon: RouteIcon },
  {
    id: Menu.WRITE,
    label: '게시글 작성',
    icon: WriteIcon,
    iconWidth: '28px',
  },
];

const HomeGnb = ({ onClickMenu }) => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const { viewType, markerCount, polygon } = useSelector((state) => state.map);
  const prevMarkers = useSelector((state) => state.marker.prevMarkers);
  const menu = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMarkers = async () => {
      if (prevMarkers.length !== 0) {
        dispatch(loadMarkers({ prevMarkers }));
        dispatch(removePrevMarkers());
        return;
      }

      const markers = await getPosts(
        accessToken,
        viewType,
        polygon,
        markerCount,
      );
      dispatch(loadMarkers({ prevMarkers: markers }));
    };

    if (menu === Menu.TRIP) {
      getMarkers();
    }
  }, [
    dispatch,
    menu,
    accessToken,
    viewType,
    polygon,
    prevMarkers,
    markerCount,
  ]);

  return (
    <nav className='side_nav'>
      <div className='menu'>
        <div className='menu_Icon'>
          <Link to='/mypage' style={{ textDecoration: 'none' }}>
            <div className='icon_up'>
              <button type='button'>
                <img
                  src={MyPageIcon}
                  alt='마이페이지'
                  style={{ width: '24px' }}
                />
              </button>
              <span>마이페이지</span>
            </div>
          </Link>
          {menuItems.map((menuItem) => (
            <div
              key={menuItem.id}
              className={`icon_up ${menu === menuItem.id ? 'selected' : ''}`}
              onClick={() => onClickMenu(menuItem.id)}
            >
              <button type='button'>
                <img
                  src={menuItem.icon}
                  alt={menuItem.label}
                  style={{ width: menuItem.iconWidth }}
                />
              </button>
              <span>{menuItem.label}</span>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default HomeGnb;
