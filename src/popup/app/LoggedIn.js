import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartItem from './cartItem';
import '../../styles/popup.css';

class LoggedIn extends Component {
  constructor(props) {
    super(props);
  }
  
  checkout() {
    window.open('https://purse.io/checkout/nyd?ref=ChromePurse');
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

  render() {
    let cartItems = [];
    let totalCost = 0;
    let numberOfItems = 0;
    if (this.props.cart && this.props.cart.length) {
      cartItems = this.props.cart.map((item, iter) => {
        totalCost += (item.fiat_price * item.quantity);
        numberOfItems += item.quantity;
        return (<CartItem key={iter} item={item} />)
      });
    }
    
    const { username, picture, first_name, last_name, wallet } = this.props.user;
    
    return (
      <div>
        <div className="row header">
          <div className="col-2 avatar">
            <img src={picture} />
          </div>
          <div className="col-6">
            <p className="username">
            { (first_name && last_name) ? `${first_name} ${last_name}` : `${username}` }
            </p>
            <p className="balances">
              <span className="balance">
                {wallet.BTC.balance.total} <span className="crypto-label">btc</span>
              </span>
              <span className="balance">
                {wallet.BCH.balance.total} <span className="crypto-label">bch</span>
              </span>
            </p>
            { (cartItems.length > 0) &&
            <p className="cart-meta">
              <span className="item-count">
                {numberOfItems} <span className="item-count-label">{(numberOfItems === 1) ? 'item': 'items'}</span>
              </span>
              <span className="cart-cost">
                ${this.numberFormat(totalCost, 2)} <span className="cart-cost-label">{this.props.cart[0].currency}</span>
              </span>
            </p>
            }
          </div>
          { (cartItems.length > 0) &&
          <div className="col-4">
            <button className="checkout"
                    onClick={this.checkout}>
              <span>Finalize</span>
            </button>
          </div>
          }
        </div>
        { cartItems.length ? cartItems : <p className="empty-purse">You have no items in your Purse List</p> } 
      </div>
    );
  }
}

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
