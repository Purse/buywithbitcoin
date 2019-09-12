import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../styles/Button';

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
    window.open('https://purse.io/checkout/nyd');
  }
  render() {
    const cartTotal = this.calcTotal();
    const currSymbol = this.props.user.settings.currency_symbol;
    return (
      <div className="col cart-checkout">
        <p>Cart subtotal ({this.props.cart.length} items): <span className="cart-total">{currSymbol}{cartTotal}</span></p>
        <Button href="https://purse.io/checkout/nyd"
                rel="noopener"
                target="_blank">
                Proceed to Checkout</Button>
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
