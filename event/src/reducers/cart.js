const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CART_ITEM':
      return action.items || [];
    default:
      return state;
  }
};
