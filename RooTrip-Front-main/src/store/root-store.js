import { combineReducers } from 'redux';

import auth from './auth-store';
import map from './map-store';
import marker from './marker-store';
import menu from './menu-store';
import photoLocation from './photoLocation-store';
import post from './post-store';

const rootReducer = combineReducers({
  auth,
  map,
  marker,
  menu,
  photoLocation,
  post,
});

export default rootReducer;
