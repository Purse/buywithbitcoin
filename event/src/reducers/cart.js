const initialState = {
  authToken: '',
  user: {
    name: ''
  },
  items: []
};

function user(state = {}, action) {
  switch (action.type) {
    case 'ADD_USERNAME':
      return { name: action.username };
      break;
    default:
      return state;
  }
}

function items(state = [], action) {
  switch (action.type) {
    case 'ADD_CART_ITEMS':
      const items = [...action.items];
      return items;
      break;
    default:
      return state;
  }
}

function token(state = '', action) {
  switch (action.type) {
    case 'ADD_TOKEN':
      return action.token;
      break;
    default:
      return state;
  }
}

export default function bwbtcApp(state = initialState, action) {
  return {
    user: user(state.user, action),
    token: token(state.token, action),
    items: items(state.items, action)
  };
};
