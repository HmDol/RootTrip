import { createAction, handleActions } from 'redux-actions';

const SET = 'MAP_COORDINATE/SET';
const CHANGE = 'MAP_COORDINATE/CHANGE';
const RESET = 'MAP_COORDINATE/RESET';

export const setCoordinateOnMap = createAction(SET);
export const changeCoordinateOnMap = createAction(CHANGE);
export const resetCoordinateOnMap = createAction(RESET);

const mapState = {
  viewType: 0,
  currentZoom: 0,
  markerCount: 8,
  polygon: '',
  center: [131.1, 36.4395],
  zoom: 5.5,
};

const map = handleActions(
  {
    [SET]: (state, action) => ({
      ...action.payload,
      center: [],
    }),
    [CHANGE]: (state, { payload }) => ({
      ...state,
      center: payload.newMap.center,
      zoom: payload.newMap.zoom,
    }),
    [RESET]: (state, action) => ({
      viewType: 0,
      currentZoom: 0,
      markerCount: 8,
      polygon: '',
      center: [131.1, 36.4395],
      zoom: 5.5,
    }),
  },
  mapState,
);

export default map;
