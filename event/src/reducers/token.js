const initialState = '';

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TOKEN':
      return action.token || '';
    default:
      return state;
  }
};
