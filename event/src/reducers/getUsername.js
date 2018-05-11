const initialState = '';

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USERNAME':
      return action.token || '';
    default:
      return state;
  }
};
