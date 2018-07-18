import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartItem from './cartItem';
import '../../../../../styles/popup.css';

class LoggedIn extends Component {
  constructor(props) {
    super(props);
  }
  
  checkout() {
    window.open('https://purse.io/checkout/nyd');
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
    
    return (
      <div>
        <div className="row header">
          <div className="col-5">
            <h2>Shopping Cart</h2>
            <p className="username">{this.props.username}</p>
          </div>
          { (cartItems.length > 0) &&
            <div className="col-7">
              <div className="row">
                <div className="col-5 text-right order-meta">
                  <p>{numberOfItems} Item(s)</p>
                  <p>{this.numberFormat(totalCost, 2)}</p>
                </div>
                <div className="col-7">
                  <button className="checkout"
                          onClick={this.checkout}>
                    <span>Finalize</span>
                  </button>
                </div>
              </div>
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
    username: state.user.name,
    cart: state.items
  };
};

export default connect(mapStateToProps)(LoggedIn);
