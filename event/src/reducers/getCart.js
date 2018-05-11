const initialState = '';

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CART_ITEMS':
      return action.token || '';
    default:
      return state;
  }
};
