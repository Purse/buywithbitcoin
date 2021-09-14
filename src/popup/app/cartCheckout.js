import React, { Component } from 'react';
import { connect } from 'react-redux';
import { countryConfigs } from '../../content/app/SanitizePrice';
import Button from '../../styles/Button';
import PropTypes from 'prop-types';

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
  getCurrencySymbol() {
    const items = this.props.cart;
    if (items && items.length) {
      return countryConfigs[items[0].country.toLowerCase()].symbol;
    }
    return this.props.user.settings.currency_symbol;
  }
  goToCheckout() {
    window.open('https://purse.io/checkout/nyd?ref=ChromePurse');
  }
  render() {
    const cartTotal = this.calcTotal();
    const currSymbol = this.getCurrencySymbol();
    return (
      <div className="col cart-checkout">
        <p>Cart subtotal ({this.props.cart.length} items): <span className="cart-total">{currSymbol}&nbsp;{cartTotal}</span></p>
        <Button href="https://purse.io/checkout/nyd?ref=ChromePurse"
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

CartCheckout.propTypes = {
  discount: PropTypes.number,
  user: PropTypes.object,
  cart: PropTypes.array
};

export default connect(mapStateToProps)(CartCheckout);
