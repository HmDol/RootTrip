import { useCallback } from 'react';

import likeImage from '@assets/post/like.png';
import notLikeImage from '@assets/post/notLike.png';
import { likePost, unLikePost } from '@services/post';

const LikeButton = ({ accessToken, postId, isLikedPost, setIsLikedPost }) => {
  const onClickLikeHandler = useCallback(async () => {
    try {
      await likePost(accessToken, postId);
      setIsLikedPost(true);
    } catch (e) {
      alert(e.message);
    }
  }, [accessToken, postId, setIsLikedPost]);

  const onClickUnlikeHandler = useCallback(async () => {
    try {
      await unLikePost(accessToken, postId);
      setIsLikedPost(false);
    } catch (e) {
      alert(e.message);
    }
  }, [accessToken, postId, setIsLikedPost]);

  return (
    <button
      type='button'
      onClick={isLikedPost ? onClickUnlikeHandler : onClickLikeHandler}
    >
      <img src={isLikedPost ? likeImage : notLikeImage} alt='LIKE_IMAGE' />
    </button>
  );
};

export default LikeButton;
