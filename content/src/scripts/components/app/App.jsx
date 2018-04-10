import React, {Component} from 'react';
import {connect} from 'react-redux';
const dataUrl = `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAABCJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDx0aWZmOkNvbXByZXNzaW9uPjU8L3RpZmY6Q29tcHJlc3Npb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjQ4PC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT4xPC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj40ODwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgICAg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)`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAmazon: false
    };
    this.addToCart = this.addToCart.bind(this);
    this.getCart = this.getCart.bind(this);
  }

  componentDidMount() {
    if (document.location.host === 'purse.io' && (!this.state.token)) {
      const showAmazon = false;
      this.setState({ showAmazon });
      document.cookie.split('; ').forEach((cookie) => {
        const cookieKeyVal = cookie.split('=');
        if (cookieKeyVal[0] === 'purse_token') {
          this.getUser(cookieKeyVal[1]);
          this.props.dispatch({
            type: 'ADD_TOKEN',
            token: cookieKeyVal[1]
          }).then(() => {
            this.getCart(cookieKeyVal[1]);
          });
        }
      });
    } else if (document.location.host === 'www.amazon.com') {
      const showAmazon = true;
      this.setState({showAmazon});
      this.grabAsin();
      this.grabPrice();
    }
  }
  
  getCart(token) {
    fetch(`https://api.purse.io/api/v1/users/me/lists`, {
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
          this.props.dispatch({
            type: 'ADD_CART_ITEM',
            items: response[0].items
          });
        }
      })
      .catch();
  }

  getUser(token) {
    fetch(`https://api.purse.io/api/v1/users/me`, {
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
        this.props.dispatch({
          type: 'ADD_USERNAME',
          username: username
        });
      })
      .catch(console.log);
  }

  grabAsin() {
    const asin = document.querySelector('[data-asin]').getAttribute('data-asin');
    if (asin) {
      this.setState({asin: asin});
    }
  }

  grabPrice() {
    const priceStr = document.querySelector('#priceblock_ourprice').innerText;
    const priceNum = parseFloat(priceStr.replace(/\$|,/g, ''));
    const fivePercentOff = (priceNum * (1 - .05)).toFixed(2);
    const thirtyThreePercentOff = (priceNum * (1 - .33)).toFixed(2);
    const percentOffText = `$${thirtyThreePercentOff} - $${fivePercentOff}`;
    this.setState({ percentOffText });
  }

  addToCart() {
    const newItem = {
      asin: this.state.asin,
      quantity: 1,
      country: 'US',
      variation: true
    };
    
    const body = {
      country: 'US',
      name: 'Cart',
      id: 1,
    items: [newItem, ...this.props.cart]
    };
    fetch(`https://api.purse.io/api/v1/users/${this.props.username}/lists/1`, {
      method: 'PUT',
      headers: {
        'Authorization': `JWT ${this.props.token}`,
        'Content-Type': 'application/json',
        'origin': 'https://purse.io'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .catch(console.log);
  }

  render() {
    const isAmazonAndLoggedIn = this.state.showAmazon && this.props.token;
    const buttonStyle = {
      display:'block',
      padding: '10px 10px 10px 30px',
      color: '#555',
      marginBottom: 15,
      backgroundImage: dataUrl,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 20,
      backgroundPosition: '3% 50%',
      textAlign: 'center',
      borderRadius: 4,
      outline: 'none',
      border: '1px solid #ddd'
    };
    return (
      <div>
      {isAmazonAndLoggedIn &&
        <button style={buttonStyle} onClick={this.addToCart}>Pay <b>{this.state.percentOffText}</b> with Bitcoin</button>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count,
    token: state.token,
    username: state.username,
    cart: state.cart
  };
};

export default connect(mapStateToProps)(App);
