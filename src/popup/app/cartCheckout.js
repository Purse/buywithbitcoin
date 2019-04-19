import React, { Component } from 'react';
import { connect } from 'react-redux';

class CartCheckout extends Component {
  calcTotal() {
    const items = this.props.cart;
    let total = 0;
    
    items.forEach((item) => {
      const { quantity, fiat_price } = item;
      total += parseFloat(quantity * fiat_price);
    });
    
    return (total * (1 - this.props.discount)).toFixed(2);
  }
  goToCheckout() {
    window.open('https://purse.io/checkout/nyd?ref=ChromePurse');
  }
  render() {
    const cartTotal = this.calcTotal();
    const currSymbol = this.props.user.settings.currency_symbol;
    return (
      <div className="col cart-checkout">
        <p>Cart subtotal ({this.props.cart.length} items): <span className="cart-total">{currSymbol}{cartTotal}</span></p>
        <button type="button" 
                className="btn btn-primary"
                onClick={this.goToCheckout}>Proceed to Checkout</button>
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
    cart: state.items,
    discount: state.discount
  };
};

export default connect(mapStateToProps)(CartCheckout);
