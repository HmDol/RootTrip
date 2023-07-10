import { createAction, handleActions } from 'redux-actions';

const ON = 'PHOTO_LOCATION/ON';
const UPDATE = 'PHOTO_LOCATION/UPDATE';
const OFF = 'PHOTO_LOCATION/OFF';

export const onLocation = createAction(ON);
export const updateLocation = createAction(UPDATE);
export const offLocation = createAction(OFF);

const locationState = {
  fileName: '',
  isSetLocation: false,
  latitude: '',
  longitude: '',
};

const photoLocation = handleActions(
  {
    [ON]: (state, { payload: fileName }) => ({
      ...state,
      fileName,
      isSetLocation: true,
    }),
    [UPDATE]: (state, { payload: coordinate }) => ({
      ...state,
      latitude: coordinate.lat,
      longitude: coordinate.lng,
    }),
    [OFF]: (state, action) => ({
      fileName: '',
      isSetLocation: false,
      latitude: '',
      longitude: '',
    }),
  },
  locationState,
);

export default photoLocation;
