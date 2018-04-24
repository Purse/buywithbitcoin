const initialState = '';

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USERNAME':
      return action.username || '';
    default:
      return state;
  }
};
