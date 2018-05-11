import {combineReducers} from 'redux';

import count from './count';
import token from './token';
import username from './username';
import getUsername from './getUsername';
import cart from './cart';
import addItemToCart from './addItemToCart';
import getCart from './getCart';

export default combineReducers({
  count,
  token,
  getUsername,
  username,
  cart,
  addItemToCart,
  getCart
});
