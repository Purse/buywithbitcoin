const getUser = async (token) => {
  if (!token) return null;
  
  return fetch(`https://api.purse.io/api/v1/users/me`, {
    method: 'GET',
    headers: {
      'Authorization': `JWT ${token}`,
      'Content-Type': 'application/json',
      'origin': 'https://purse.io'
    }
  })
    .then(res => res.json())
    .then(response => {
      const { username } = response;
      return username;
    })
    .catch(console.log);
};

export { getUser };
