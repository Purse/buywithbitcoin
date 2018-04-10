import {combineReducers} from 'redux';

import count from './count';
import token from './token';
import username from './username';
import cart from './cart';

export default combineReducers({
  count,
  token,
  username,
  cart
});
