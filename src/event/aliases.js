import { fetchUserInfo, fetchCartItems, fetchUpdateList } from './actions/index';

export default {
  'GET_USERINFO': fetchUserInfo,
  'GET_CART_ITEMS': fetchCartItems,
  'ADD_TO_CART': fetchUpdateList,
  'REMOVE_FROM_CART': fetchUpdateList
}