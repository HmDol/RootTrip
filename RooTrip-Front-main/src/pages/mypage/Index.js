import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LogoImage from '@assets/rooTrip/logo.png';
import MypageMenu from '@constants/mypageMenu';

import { likedArticle, myTripArticle, savedArticle } from '@services/route';
import { resetCoordinateOnMap } from '@store/map-store';
import { changeMenu } from '@store/menu-store';
import { closePost } from '@store/post-store';
import { loadedProfile } from '@services/image';
import Nav from './Nav';
import Modify from './Modify';
import MyTrip from './MyTrip';
import LikedTrip from './LikedTrip';
import SavedTrip from './SavedTrip';
import Unsigned from './Unsigned';
import '@styles/mypage/mypage.scss';

const Index = () => {
  const [myArticleData, setMyArticleData] = useState(null);
  const [likedArticleData, setLikedArticleData] = useState(null);
  const [savedArticleData, setsavedArticleData] = useState(null);
  const [myprofileImg, setMyprofileImg] = useState('');
  // const [profileImgUrl, setProfileImgUrl] = useState('');

  const accessToken = useSelector((state) => state.auth.accessToken);
  const mypageMenu = useSelector((state) => state.menu);
  const { postId } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  // 내가 올린 게시글 불러오기
  const onMyTripArticle = useCallback(async () => {
    try {
      const myTripArticleToken = await myTripArticle(accessToken);
      setMyArticleData(myTripArticleToken);
    } catch (e) {
      alert('저장된 게시글 가져오기 실패!');
    }
  }, [accessToken]);

  // 좋아요 누른 게시글 불러오기
  const onLikedArticle = useCallback(async () => {
    try {
      const likedArticleToken = await likedArticle(accessToken);
      setLikedArticleData(likedArticleToken);
    } catch (e) {
      alert('좋아요 게시글 가져오기 실패!');
    }
  }, [accessToken]);

  // 저장된 게시글 불러오기
  const onSavedArticle = useCallback(async () => {
    try {
      const savedArticleToken = await savedArticle(accessToken);
      setsavedArticleData(savedArticleToken);
    } catch (e) {
      alert('저장된 게시글 가져오기 실패!');
    }
  }, [accessToken]);
  // 저장된 프로필 가져오기
  const loadProfile = useCallback(async () => {
    try {
      const profile = await loadedProfile(accessToken);
      setMyprofileImg(profile.profileImage);
    } catch (e) {
      alert('프로필 가져오기 실패');
    }
  }, [accessToken]);

  // 메뉴 클릭 이벤트
  const onClickMenuHandler = useCallback(
    (clickedMenu) => {
      dispatch(changeMenu({ clickedMenu }));
      dispatch(resetCoordinateOnMap());
      if (postId) dispatch(closePost());

      if (clickedMenu === 'MODIFY') {
        loadProfile();
      }
      if (clickedMenu === 'MYTRIP') {
        onMyTripArticle();
      }
      if (clickedMenu === 'LIKEDTRIP') {
        onLikedArticle();
      }
      if (clickedMenu === 'SAVEDTRIP') {
        onSavedArticle();
      }
    },
    [
      dispatch,
      loadProfile,
      onLikedArticle,
      onMyTripArticle,
      onSavedArticle,
      postId,
    ],
  );

  let content = '';
  switch (mypageMenu) {
    case MypageMenu.MODIFY:
      content = (
        <Modify accessToken={accessToken} myProfileImg={myprofileImg} />
      );
      break;
    case MypageMenu.MYTRIP:
      content = <MyTrip articleData={myArticleData} />;
      break;
    case MypageMenu.LIKEDTRIP:
      content = <LikedTrip articleData={likedArticleData} />;
      break;
    case MypageMenu.SAVEDTRIP:
      content = <SavedTrip articleData={savedArticleData} />;
      break;
    case MypageMenu.UNSIGNED:
      content = <Unsigned accessToken={accessToken} />;
      break;
    default:
      content = <Modify accessToken={accessToken} />;
      break;
  }

  return (
    <div>
      <header>
        <Link to='../'>
          <img src={LogoImage} alt='사진 없음' />
        </Link>
        <h1>마이 페이지</h1>
      </header>
      <content>
        <Nav onClickMenu={onClickMenuHandler}></Nav>
        <div className='contentBox'>{content}</div>
      </content>
      <footer></footer>
    </div>
  );
};

export default Index;
