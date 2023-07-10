import { createAction, handleActions } from 'redux-actions';

const SET = 'TOKEN/SET';
const REMOVE = 'TOKEN/REMOVE';

export const setToken = createAction(SET);
export const removeToken = createAction(REMOVE);

const accessTokenState = {
  accessToken: '',
  expireTime: 14 * 60 * 1000, // Client(Default) = 14m, Server = 15m
};

const auth = handleActions(
  {
    [SET]: (state, { payload }) => ({
      accessToken: payload.accessToken,
      expireTime: (payload.expire - 60) * 1000, // 원활한 통신을 위해 Client 만료 시간 14분으로 설정
    }),
    [REMOVE]: () => ({ accessToken: '', expireTime: 0 }), // Token 초기화
  },
  accessTokenState,
);

export default auth;
