import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartItem from './cartItem';
import CartCheckout from './cartCheckout';
import '../../styles/popup.css';
import PropTypes from 'prop-types';

class LoggedIn extends Component {
  constructor(props) {
    super(props);
  }

  checkout() {
    window.open('https://purse.io/checkout/nyd?ref=ChromePurse');
  }

  goToAmazon() {
    window.open('https://www.amazon.com');
  }

  numberFormat(number, dec, dsep, tsep) {
    if (isNaN(number) || number == null) {
			return '';
		}

		number = number.toFixed(~~dec);
		tsep = typeof tsep === 'string' ? tsep : ',';

		const parts = number.split('.'),
			fnums = parts[0],
			decimals = parts[1] ? (dsep || '.') + parts[1] : '';

		return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep) + decimals;
	}

  openOptions() {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
    return false;
  }

  render() {
    let cartItems = [];
    // let totalCost = 0;
    // let numberOfItems = 0;
    if (this.props.cart && this.props.cart.length) {
      cartItems = this.props.cart.map((item, iter) => {
        // totalCost += (item.fiat_price * item.quantity);
        // numberOfItems += item.quantity;
        return (<CartItem key={iter} item={item} />);
      });
    }

    // const { username, picture, first_name, last_name, wallet } = this.props.user;

    return (
      <div className="row">
        { (cartItems.length)
          ? <div className="col">
              <div className="row header no-gutters">
               <CartCheckout />
               <span onClick={this.openOptions} className="options-sprocket"></span>
             </div>
             <div className="row content">
               <div className="col">
                 {cartItems}
               </div>
             </div>
           </div>
          : <div className="col">
              <div className="empty-cart-container">
                <p className="empty-purse">Your Purse shopping cart is empty.</p>
                <button className="btn primary"
                        onClick={this.goToAmazon}>Shop on Amazon</button>
                <p><a href="#" onClick={this.openOptions}>Configure Options</a></p>
                <p><a href="https://support.purse.io/" target="_blank" rel="noreferrer">Contact Us</a></p>
                <p><a href="https://purse.io/how-it-works" target="_blank" rel="noreferrer">How it Works</a></p>
                <p><a href="https://purse.io" target="_blank" rel="noreferrer">Purse.io</a></p>
              </div>
            </div>
        }
      </div>
    );
  }
}

LoggedIn.propTypes = {
  user: PropTypes.object,
  cart: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    count: state.count,
    token: state.token,
    user: state.user,
    username: state.user.username,
    cart: state.items
  };
};

export default connect(mapStateToProps)(LoggedIn);
