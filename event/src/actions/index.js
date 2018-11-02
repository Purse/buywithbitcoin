import 'babel-polyfill';

function fetchRemoveItem(originalAction) {
  
}

function fetchUpdateList(originalAction) {
  const { token, username, body } = originalAction;

  return (dispatch) => {
    return fetch(`https://api.purse.io/api/v1/users/${username}/lists/1`, {
      method: 'PUT',
      headers: {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/json',
        'origin': 'https://purse.io'
      },
      body: JSON.stringify(body)
    }).then(res => res.json())
      .then(async (res) => {
        const text = (res.items.length) ? res.items.length.toString() : '' ;
        chrome.browserAction.setBadgeText({ text });
        console.log('adding new items to redux', res);
        await dispatch(addCartItems(res))
        console.log('done adding new items to redux');
      })
      .catch(console.log);
  };
}

function fetchUsername(originalAction) {
  const { token } = originalAction;
  
  return (dispatch) => {
    return fetch(`https://api.purse.io/api/v1/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/json',
        'origin': 'https://purse.io'
      }
    }).then(res => res.json())
      .then(res => {
        const { username } = res;
        dispatch(addUsername(username));
      })
      .catch(console.log);
  }; 
}

function fetchCartItems(originalAction) {
  const { token } = originalAction;
  
  return (dispatch) => {
    return fetch(`https://api.purse.io/api/v1/users/me/lists`, {
      method: 'GET',
      headers: {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/json',
        'origin': 'https://purse.io'
      }
    }).then(res => res.json())
      .then(res => {
        if (res[0] && res[0].items) {
          dispatch(addCartItems(res[0].items));
          // const qty = res[0].items.map(num => num.quantity)
          //   .reduce((acc, curr) => acc + curr, 0);
          const text = (res[0].items.length) ? res[0].items.length.toString() : '' ;
          chrome.browserAction.setBadgeText({ text });
        }
      })
      .catch(console.log);
  };
}

function addItemToCart(token, username, body) {
  return {
    type: 'ADD_TO_CART',
    token,
    username,
    body
  }
}

function removeItemFromCart(token, username, body) {
  return {
    type: 'REMOVE_FROM_CART',
    token,
    username,
    body
  };
}

function getUsername(token) {
  return {
    type: 'GET_USERNAME',
    token
  };
}

function addUsername(username) {
  return {
    type: 'ADD_USERNAME',
    username
  };
}

function getCartItems(token) {
  return {
    type: 'GET_CART_ITEMS',
    token
  };
}

function addCartItems(items) {
  return {
    type: 'ADD_CART_ITEMS',
    items
  };
}

function addToken(token) {
  return {
    type: 'ADD_TOKEN',
    token: token
  };
}

export { addUsername, addCartItems, getUsername, getCartItems, addItemToCart,
         addToken, fetchUsername, fetchCartItems, fetchUpdateList, removeItemFromCart };