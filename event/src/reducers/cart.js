const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CART_ITEMS':
      return action.items || [];
    default:
      return state;
  }
};
