import { fetchUserInfo, fetchCartItems, fetchUpdateList } from './actions/index';

export default {
  'GET_USERINFO': fetchUserInfo,
  'GET_CART_ITEMS': fetchCartItems,
  'UPDATE_CART_ITEMS': fetchUpdateList 
}