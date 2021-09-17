import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getCartItems, updateCartItems } from '../../event/actions/index';
import sanitizePrice from './SanitizePrice';
import PropTypes from 'prop-types';
import styles from '../../styles/amazon.button.css';

class ProductApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: ''
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.addToCart = this._debounce(this.addToCart.bind(this), 100);
    this.hoverState = this.hoverState.bind(this);
    this.unHoverState = this.unHoverState.bind(this);
    this.turnClock = this.turnClock.bind(this);
    this.changeObserver = false;
  }

  componentDidMount() {
    this.renderProductInfo();
    this.listenForVariationChange();
  }

  renderProductInfo() {
    this.setState({ buttonText: this.props.buttonText });
    this.grabAsin();
    this.grabPrice();
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
    const symbolReg = /\$|￥|¥|£|€|EUR|CDN\$/g;
    const productForm = document.querySelector('#addToCart');
    const dealPrice =
      document.querySelector('#priceblock_dealprice') ||
      document.querySelector('#priceblock_saleprice') ||
      document.getElementById('#priceblock_pospromoprice') ||
      document.querySelector('#priceblock_snsprice_Based') ||
      document.querySelector('.a-color-price.offer-price') ||
      document.querySelector('#buyNewSection .offer-price') ||
      document.querySelector('#new-button-price span') ||
      document.querySelector('#priceblock_ourprice span:not(:first-child)') ||
      document.querySelector('#MediaMatrix .swatchElement .a-color-price') ||
      document.querySelector('.kindle-price .a-color-price') ||
      document.querySelector('#newOfferAccordionRow .a-color-price');

    if (dealPrice) {
      priceStr = dealPrice;
    } else if (productForm && productForm.querySelector('#price_inside_buybox')) {
      priceStr = productForm.querySelector('#price_inside_buybox');
    } else {
      const priceBlock = document.querySelector('#price');
      priceStr = priceBlock.querySelector('span[id^=priceblock_ourprice]');
    }
    const priceSymbol = priceStr.innerText.match(symbolReg)[0];
    const priceNum = sanitizePrice(priceStr.innerText, country);
    // const fivePercentOff = (priceNum * (1 - .05)).toFixed(2);
    const thirtyThreePercentOff = (priceNum * .33).toFixed(2);
    const amountOffText = `${priceSymbol}${thirtyThreePercentOff}`;
    const pricingText = <span>Save up to <strong>{amountOffText}</strong> with Bitcoin</span>;
    this.setState({ pricingText, country });
  }

  tldMap(tld) {
    const tlds = {
      '.co.uk': 'UK',
      '.ca': 'CA',
      '.co.jp': 'JP',
      '.com': 'US',
      '.de': 'DE'
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
            if (this.state.addingtoCartInterval) {
              setTimeout(() => {
                clearInterval(this.state.addingtoCartInterval);
                this.addingtoCartInterval = null;
                const buttonText = this.props.buttonInCart;
                this.setState({ buttonText });
              }, 200);
            }
          });
      });
  }

  /**
   * Adds an observer that updates the component if a variation is selected.
   */
  listenForVariationChange() {
    // Only create 1 observer
    if (!this.changeObserver) {
      const observerOptions = {
        childList: true,
        attributes: true,
        characterDataOldValue: true,
        subtree: true,
        characterData: true,
      };

      let el = '';
      if (document.getElementById('pmpux_feature_div') && document.getElementById('pmpux_feature_div').offsetWidth > 0) {
        el = document.getElementById('pmpux_feature_div');
      } else if (document.getElementById('unifiedPrice_feature_div')) {
        el = document.getElementById('unifiedPrice_feature_div');
      } else if (document.getElementById('tmmSwatches')) {
        el = document.getElementById('tmmSwatches');
      } else if (document.getElementById('top')) {
        el = document.getElementById('top');
      }

      if (el) {
        this.changeObserver = new MutationObserver(this._debounce(() => {
          this.renderProductInfo();
        }, 500));
        this.changeObserver.observe(el, observerOptions);
      }
    }
  }

  // the mutation observer callback gets run a bunch so debouncing it
  _debounce(cb, time) {
    let timeout;
    return function () {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        cb.apply(this, arguments);
      }, time);
    };
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
    document.location = `https://purse.io/shop?ext_redirect=${amazonUrl}`;
  }

  render() {
    const isLoggedIn = this.props.token;
    const isNotLoggedIn = !this.props.token;

    return (
      <div className={styles.dislayStyle}>
      {isLoggedIn && this.state.asin &&
        <div className={styles.buttonWrapStyle}
             onClick={this.addToCart}
             onMouseEnter={this.hoverState}
             onMouseLeave={this.unHoverState}>
          {this.state.pricingText}
          <button className={styles.buttonStyle}
                  onClick={this.addToCart}
                  onMouseEnter={this.hoverState}
                  onMouseLeave={this.unHoverState}>
            {this.state.buttonText}
          </button>
        </div>}
      {isNotLoggedIn &&
        <button className={styles.unAuthed}
                onClick={this.navToPurse}>
          Log in at Purse.io
        </button>}
      </div>
    );
  }
}

ProductApp.defaultProps = {
  buttonText: '➕',
  buttonHover: '☝️',
  buttonInCart: '🤙',
  addingToCart: ['🕐','🕑','🕒','🕓','🕔','🕕','🕖','🕗','🕘','🕙','🕚','🕛']
};

ProductApp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  username: PropTypes.string,
  token: PropTypes.string,
  buttonText: PropTypes.string,
  buttonHover: PropTypes.string,
  buttonInCart: PropTypes.string,
  addingToCart: PropTypes.func.isRequired,
  cart: PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
    username: state.user.username,
    cart: state.items
  };
};

export default connect(mapStateToProps)(ProductApp);
