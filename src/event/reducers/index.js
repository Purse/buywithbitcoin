import { combineReducers } from 'redux';

function user(state = {}, action) {
  switch (action.type) {
    case 'ADD_USERINFO':
      return { ...action.user };
    default:
      return state;
  }
}

function items(state = [], action) {
  switch (action.type) {
    case 'ADD_CART_ITEMS': {
      const items = [...action.items];
      return items;
    }
    default:
      return state;
  }
}

function token(state = '', action) {
  switch (action.type) {
    case 'ADD_TOKEN':
      return action.token;
    default:
      return state;
  }
}

function discount(state = 0.05, action) {
  switch (action.type) {
    case 'SET_DISCOUNT':
        return action.discount;
    default:
      return state;
  }
}

export default combineReducers({
  user,
  token,
  items,
  discount
});
