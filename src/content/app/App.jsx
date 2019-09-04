import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../styles/amazon.button.css';
import { addUsername, getCartItems, updateCartItems } from '../../event/actions/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: ''
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.hoverState = this.hoverState.bind(this);
    this.unHoverState = this.unHoverState.bind(this);
    this.turnClock = this.turnClock.bind(this);
  }
  
  componentDidMount() {
    this.setState({ buttonText: this.props.buttonText });
    this.grabAsin();
    this.grabPrice();
    // this.listenForStyleSwitch();
  }

  grabAsin() {
    const asin = document.querySelector('#addToCart #ASIN').value;
    const customId = this.grabCustomId();
    if (asin && customId) {
      this.setState({ asin });
    } else if (asin) {
      this.setState({ asin });
    }
  }
  
  // Not yet supported on Purseio, so just keeping this here until it's enabled
  grabCustomId() {
    const urlObj = window.location;
    const urlSearchArray = urlObj.search.split('&');
    let customId;
    urlSearchArray.forEach((searchIndex) => {
      if (searchIndex.match(/^customId/)) {
        customId = searchIndex.split('customId=')[1];
      }
    });
    
    return customId;
  }

  grabPrice() {
    let priceStr;
    const url = window.location && window.location.origin;
    const tld = url && url.split('amazon')[1];
    const country = this.tldMap(tld);
    const symbolReg = /\$|,|￥|£|CDN\$/g;
    const productForm = document.querySelector('#addToCart');
    const dealPrice = document.querySelector('#priceblock_dealprice');
    const snsPrice = document.querySelector('#priceblock_snsprice_Based');
    const bookPrice = document.querySelector('.a-color-price.offer-price');
    if (dealPrice) {
      priceStr = dealPrice;
    } else if (productForm && productForm.querySelector('#price_inside_buybox')) {
      priceStr = document.querySelector('#addToCart')
        .querySelector('#price_inside_buybox');
    } else if (snsPrice) {
      priceStr = snsPrice;
    } else if (bookPrice) {
      priceStr = bookPrice;
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
    this.setState({ pricingText, country });
  }
  tldMap(tld) {
    const tlds = {
      '.co.uk': 'UK',
      '.com': 'US'
    };
    return tlds[tld] || 'US';
  }
  turnClock() {
    const currentTurn = this.props.addingToCart.shift();
    this.props.addingToCart.push(currentTurn);
    this.setState({ buttonText: currentTurn});  
  }
  addToCart() {
    const addingtoCartInterval = setInterval(this.turnClock, 300);
    this.setState({addingtoCartInterval});
    
    const newItem = {
      asin: this.state.asin,
      quantity: 1,
      country: this.state.country,
      variation: true
    };

    this.props.dispatch(getCartItems(this.props.token))
      .then(() => {
        const body = {
          country: this.state.country,
          name: 'Cart',
          id: 1,
          items: this.buildCart(newItem)
        };
        this.props.dispatch(updateCartItems(this.props.token, this.props.username, body))
          .then(() => {
            clearInterval(this.state.addingtoCartInterval);
            const buttonText = this.props.buttonInCart;
            this.setState({ buttonText });
          });
      });
  }
  
  listenForStyleSwitch() {
    const observerOptions = {
      childList: true,
      attributes: true,
      characterDataOldValue: true,
      subtree: true,
      characterData: true,
    }
    const observer = new MutationObserver(this._debounce((mutationList, observer) => {
      this.componentDidMount();
    }, 1000));
    observer.observe(document.querySelector('#desktop_unifiedPrice'), observerOptions);
  }
  
  // the mutation observer callback gets run a bunch so debouncing it
  _debounce(cb, time) {
    let timeout;
    return function () {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        cb.apply(this, arguments);
      }, time);
    }
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
        <button className='unAuthed'
                onClick={this.navToPurse}>
          Log in at Purse.io
        </button>}
      </div>
    );
  }
}

App.defaultProps = {
  buttonText: '➕',
  buttonHover: '☝️',
  buttonInCart: '🤙',
  addingToCart: ['🕐','🕑','🕒','🕓','🕔','🕕','🕖','🕗','🕘','🕙','🕚','🕛']
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
    username: state.user.username,
    cart: state.items
  };
};

export default connect(mapStateToProps)(App);
