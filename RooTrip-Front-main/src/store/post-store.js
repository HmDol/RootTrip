import { createAction, handleActions } from 'redux-actions';

const LOAD = 'POST/LOAD';
const CLOSE = 'POST/CLOSE';

export const loadPost = createAction(LOAD);
export const closePost = createAction(CLOSE);

const postState = {
  postId: '',
};

const post = handleActions(
  {
    [LOAD]: (state, { payload }) => ({
      postId: payload.postId,
    }),
    [CLOSE]: (state, action) => ({
      postId: '',
    }),
  },
  postState,
);

export default post;
