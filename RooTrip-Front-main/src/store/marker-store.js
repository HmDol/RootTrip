import { createAction, handleActions } from 'redux-actions';

const LOAD = 'MARKER/LOAD';
const INSERT = 'MARKER/INSERT';
const INSERT_USER_MARKER = 'MRKER/INSERT_USER_MARKER';
const SAVE_PREV = 'MARKER/SAVE';
const REMOVE = 'MARKER/REMOVE';
const REMOVE_PREV = 'MARKER/REMOVE_PREV';
const REOMVE_ALL = 'MARKER/REMOVE_ALL';

export const loadMarkers = createAction(LOAD);
export const insertMarker = createAction(INSERT);
export const insertUserMarker = createAction(INSERT_USER_MARKER);
export const savePrevMarkers = createAction(SAVE_PREV);
export const removeMarker = createAction(REMOVE);
export const removePrevMarkers = createAction(REMOVE_PREV);
export const removeAllMarkers = createAction(REOMVE_ALL);

const markerState = {
  marker: [],
  userMarker: [],
  prevMarkers: [],
};

const marker = handleActions(
  {
    [LOAD]: (state, { payload: markers }) => ({
      ...state,
      marker: markers.prevMarkers,
    }),
    [INSERT]: (state, { payload: data }) => ({
      ...state,
      marker: state.marker.concat(data),
    }),
    [INSERT_USER_MARKER]: (state, { payload: data }) => ({
      ...state,
      userMarker: state.userMarker.concat(data),
    }),
    [SAVE_PREV]: (state, { payload }) => ({
      ...state,
      prevMarkers: payload.data,
    }),
    [REMOVE]: (state, { payload }) => {
      const removedMarker = state.marker.filter((m) => m.id === payload.id);

      if (removedMarker[0]?.order) {
        return {
          ...state,
          marker: state.marker
            .filter((m) => m.id !== payload.id)
            .map((m) =>
              m.order > removedMarker[0].order
                ? { ...m, order: m.order - 1 }
                : m,
            ),
        };
      }

      return {
        ...state,
        marker: state.marker.filter((m) => m.postId !== payload.postId),
      };
    },
    [REMOVE_PREV]: (state, { payload }) => ({
      ...state,
      prevMarkers: [],
    }),
    [REOMVE_ALL]: (state, { payload }) => ({
      ...state,
      marker: [],
    }),
  },
  markerState,
);

export default marker;
