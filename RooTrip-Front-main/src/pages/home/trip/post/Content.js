import { useCallback, useEffect, useState } from 'react';

import DefaultImage from '@assets/user/default.png';
import NavigationImage from '@assets/post/navigation.png';
import likeImage from '@assets/post/like.png';
import notLikeImage from '@assets/post/notLike.png';
import { getComments } from '@services/post';
import Photos from './Photos';
import Comment from './Comment';

const Content = ({ accessToken, postId, post, photos, others, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const { postView, isLikedPost, like, commentsCount } = others;
  const { user, title, content } = post;
  const { profileImage, name } = user;

  useEffect(() => {
    const loadComments = async () => {
      try {
        setIsLoading(true);
        const comment = await getComments(accessToken, postId);

        setComments(comment);
        setIsLoading(false);
      } catch (e) {
        alert(e);
      }
    };

    loadComments();
  }, [accessToken, postId]);

  const onChangePhoto = useCallback((move) => {
    setCurrentPhoto((prevPhoto) => prevPhoto + move);
  }, []);

  const onAddCommentHandler = useCallback((comment) => {
    setComments((prev) => [...prev, comment]);
  }, []);

  if (isLoading) return null;

  return (
    <div className='modal-post'>
      <div className='modal-left'>
        <div className='modal-photos'>
          <Photos
            photoWidth={432}
            photos={photos}
            current={currentPhoto}
            onChangePhoto={onChangePhoto}
          />
        </div>
        <div className='modal-other-info'>
          <div className='modal-other-left'>
            <span>조회수 {postView}</span>
            <span>좋아요 {like}</span>
            <span>댓글 {commentsCount}</span>
          </div>
          <div className='modal-other-right'>
            <button>
              <img src={NavigationImage} alt='navigation image' />
            </button>
            <button>
              <img
                src={isLikedPost ? likeImage : notLikeImage}
                alt='like image'
              />
            </button>
          </div>
        </div>
      </div>
      <div className='modal-right'>
        <div className='modal-user'>
          <img src={profileImage || DefaultImage} alt='profile image' />
          <h5 className='profile_name'>{name}</h5>
        </div>

        <div className='modal-main-content'>
          <div className='modal-article'>
            <h3 className='modal-title'>{title}</h3>
            <div className='modal-content'>
              {content.split('\\r\\n').map((line, index) => {
                if (line === '') return null;

                return (
                  <p key={index}>
                    {line}
                    <br />
                  </p>
                );
              })}
            </div>
          </div>
          <div className='modal-comments'>
            <div className='modal-comments-tot-count-box'>
              댓글 {commentsCount}개
            </div>
            {comments.map((comment) => (
              <div key={comment.id} className='modal-comment'>
                <div className='modal-comment-user'>
                  <img src={profileImage || DefaultImage} alt='profile image' />
                  <h5 className='profile_name'>{comment.name}</h5>
                  <span className='modal-comment-createAt'>
                    {comment.createdAt}
                  </span>
                </div>
                <div className='modal-comment-box'>
                  <p className='modal-comment-content'>{comment.comment}</p>
                </div>
                <div className='modal-comment-like'>
                  <img src={notLikeImage} alt='like button' />
                  <span className='modal-comment-like-count'>
                    {comment.like}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Comment
            accessToken={accessToken}
            postId={postId}
            onAddComment={onAddCommentHandler}
          />
        </div>
      </div>

      <button className='modal-post-close-button' onClick={onClose}>
        X
      </button>
    </div>
  );
};

export default Content;
