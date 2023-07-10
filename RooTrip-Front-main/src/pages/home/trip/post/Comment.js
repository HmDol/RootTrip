import { useState, useCallback } from 'react';
import EmojiPicker from 'emoji-picker-react';

import DefaultImage from '@assets/user/default.png';
import Modal from '@components/wrapper/Modal';
import { createComment } from '@services/post';
import '@styles/home/comment.scss';
import '@styles/components/modalEmoji.scss';

const Comment = ({ accessToken, postId, onAddComment }) => {
  const [inputComment, setInputComment] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onChangeCommentHandler = useCallback((e) => {
    setInputComment(e.target.value);
  }, []);

  const onSubmitCommentHandler = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await createComment(accessToken, postId, inputComment);
        setInputComment('');
        onAddComment();
      } catch (error) {
        alert(error);
      }
    },
    [accessToken, postId, inputComment, onAddComment],
  );

  const onClickEmojiPickerHandler = useCallback(() => {
    setShowEmojiPicker((prev) => !prev);
  }, []);

  const handleEmojiClick = useCallback((param) => {
    setInputComment((prevComment) => prevComment + param.emoji);
    setShowEmojiPicker(false);
  }, []);

  return (
    <div className='comment_section'>
      <form className='comment_box' onSubmit={onSubmitCommentHandler}>
        <img src={DefaultImage} alt='프로필 사진' />
        <div className='comment_input_box'>
          <input
            className='comment_input'
            type='text'
            name='comment'
            value={inputComment}
            onChange={onChangeCommentHandler}
            placeholder='댓글을 입력하세요.'
          ></input>
          {inputComment && (
            <button type='submit' className='submit-comment_button'>
              게시
            </button>
          )}
        </div>
        <button
          type='button'
          className='emoji_picker_button'
          onClick={onClickEmojiPickerHandler}
        >
          <svg
            aria-label='이모티콘'
            className='emoticon_button'
            color='rgb(115, 115, 115)'
            fill='rgb(115, 115, 115)'
            height='13'
            role='img'
            viewBox='0 0 24 24'
            width='13'
          >
            <title>이모티콘</title>
            <path d='M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z'></path>
          </svg>
        </button>
        {showEmojiPicker && (
          <Modal
            className='emoji-container'
            onClose={handleEmojiClick}
            background='white'
          >
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </Modal>
        )}
      </form>
    </div>
  );
};

export default Comment;
