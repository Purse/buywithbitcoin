const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return action.item || [];
    default:
      return state;
  }
};
