const getCart = async (token) => {
  if (!token) return null;
  
  return fetch(`https://api.purse.io/api/v1/users/me/lists`, {
    method: 'GET',
    headers: {
      'Authorization': `JWT ${token}`,
      'Content-Type': 'application/json',
      'origin': 'https://purse.io'
    }
  })
    .then(res => res.json())
    .then(response => {
      if (response[0] && response[0].items && response[0].items.length) {
        return response;
      }
    })
    .catch(console.log);
};

export { getCart };
