import { fetchUsername, fetchCartItems, fetchUpdateList } from './actions/index';

export default {
  'GET_USERNAME': fetchUsername,
  'GET_CART_ITEMS': fetchCartItems,
  'ADD_TO_CART': fetchUpdateList,
  'REMOVE_FROM_CART': fetchUpdateList
}