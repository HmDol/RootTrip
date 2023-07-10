import { createAction, handleActions } from 'redux-actions';

const CHANGE = 'MENU/CHANGE';

export const changeMenu = createAction(CHANGE);

const menuState = 'TRIP';

const menu = handleActions(
  {
    [CHANGE]: (state, { payload }) => payload.clickedMenu,
  },
  menuState,
);

export default menu;
