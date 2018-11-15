import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../../../../styles/amazon.button.css';
import { getUsername, addUsername,
         getCartItems, addItemToCart } from '../../../../../event/src/actions/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: ''
    };
    this.addToCart = this.addToCart.bind(this);
    this.hoverState = this.hoverState.bind(this);
    this.unHoverState = this.unHoverState.bind(this);
  }
  
  componentDidMount() {
    this.setState({ buttonText: this.props.buttonText });
    this.grabAsin();
    this.grabPrice();
  }

  grabAsin() {
    const asin = document.querySelector('#addToCart')
                         .querySelector('#ASIN').value;
    if (asin) {
      this.setState({ asin: asin });
    }
  }

  grabPrice() {
    let priceStr;
    const symbolReg = /\$|,|￥|CDN\$/g;
    const productForm = document.querySelector('#addToCart');
    const dealPrice = document.querySelector('#priceblock_dealprice');
    
    if (dealPrice) {
      priceStr = dealPrice;
    } else if (productForm && productForm.querySelector('#price_inside_buybox')) {
      priceStr = document.querySelector('#addToCart')
        .querySelector('#price_inside_buybox');
    } else {
      const priceBlock = document.querySelector('#price');
      priceStr = priceBlock.querySelector('span[id^=priceblock_ourprice]');
    }
    
    const priceSymbol = priceStr.innerText.match(symbolReg)[0];
    const priceNum = parseFloat(priceStr.innerText.replace(symbolReg, ''));
    const fivePercentOff = (priceNum * (1 - .05)).toFixed(2);
    const thirtyThreePercentOff = (priceNum * .33).toFixed(2);
    const amountOffText = `${priceSymbol}${thirtyThreePercentOff}`;
    const pricingText = <span>Save up to <strong>{amountOffText}</strong> with Bitcoin</span>;
    this.setState({ pricingText });
  }

  addToCart() {
    const newItem = {
      asin: this.state.asin,
      quantity: 1,
      country: 'US',
      variation: true
    };

    this.props.dispatch(getCartItems(this.props.token))
      .then(() => {
        const body = {
          country: 'US',
          name: 'Cart',
          id: 1,
          items: this.buildCart(newItem)
        };
        this.props.dispatch(addItemToCart(this.props.token, this.props.username, body))
          .then(() => {
            const buttonText = this.props.buttonInCart;
            this.setState({ buttonText });
          });
      });
  }
  
  buildCart(item) {
    const itemId = item.asin;
    const itemExists = this.props
                           .cart.findIndex(cartItem => cartItem.asin === itemId);
    if (itemExists < 0) { // Item was not in cart already
      return [item, ...this.props.cart];
    } else { // Increment quantity of existing item in cart
      const itemIndex = itemExists;
      this.props.cart[itemIndex].quantity += 1;
      return this.props.cart;
    }
  }

  hoverState () {
    const buttonText = this.props.buttonHover;
    this.setState({ buttonText });
  }

  unHoverState () {
    const buttonText = this.props.buttonText;
    this.setState({ buttonText });
  }

  navToPurse() {
    const amazonUrl = document.location.href;
    document.location = `https://purse.io/shop?ref=${amazonUrl}`;
  }

  render() {
    const isLoggedIn = this.props.token;
    const isNotLoggedIn = !this.props.token;

    return (
      <div className='dislayStyle'>
      {isLoggedIn && this.state.asin &&
        <div className='buttonWrapStyle'
             onClick={this.addToCart}
             onMouseEnter={this.hoverState}
             onMouseLeave={this.unHoverState}>
          {this.state.pricingText}
          <button className='buttonStyle'
                  onClick={this.addToCart}
                  onMouseEnter={this.hoverState}
                  onMouseLeave={this.unHoverState}>
            {this.state.buttonText}
          </button>
        </div>}
      {isNotLoggedIn &&
        <button className='buttonStyle'
                  onClick={this.navToPurse}>
            <p>Log in at Purse.io</p>
          </button>}
      </div>
    );
  }
}

App.defaultProps = {
  buttonText: '➕',
  buttonHover: '☝️',
  buttonInCart: '🤙'
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
    username: state.user.name,
    cart: state.items
  };
};

export default connect(mapStateToProps)(App);
