import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import loadable from '@loadable/component';

import Modal from '@components/wrapper/Modal';
import Menu from '@constants/menu';
import { resetCoordinateOnMap } from '@store/map-store';
import { changeMenu } from '@store/menu-store';
import { closePost } from '@store/post-store';
import HomeMenu from './HomeMenu';
import HomeLogo from './HomeLogo';
import Route from './route/Route';
import Post from './trip/Post';
import Write from './write/Write';
import '@styles/components/modalMessage.scss';

const Map = loadable(() => import('@components/map/Map'));

const Index = () => {
  const [showMessage, setShowMessage] = useState('');

  const accessToken = useSelector((state) => state.auth.accessToken);
  const menu = useSelector((state) => state.menu);
  const { postId } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  // 메시지 애니메이션
  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage('');
      }, 2000);
    }
  }, [showMessage]);

  const onCloseHandler = useCallback(
    (clickedMenu, message) => {
      if (message) setShowMessage(message);

      dispatch(changeMenu({ clickedMenu }));
      dispatch(resetCoordinateOnMap());
      dispatch(closePost());
    },
    [dispatch],
  );

  let content = '';
  switch (menu) {
    case Menu.ROUTE:
      content = <Route />;
      break;
    case Menu.WRITE:
      content = <Write onClose={onCloseHandler} />;
      break;
    default:
      break;
  }

  return (
    <>
      <HomeLogo />

      <HomeMenu onClickMenu={onCloseHandler} />

      {content}

      <Map />

      {showMessage && (
        <Modal background='white'>
          <div className='modal-message'>
            <p>{showMessage}</p>
          </div>
        </Modal>
      )}

      {postId && <Post postId={postId} accessToken={accessToken} />}
    </>
  );
};

export default Index;
