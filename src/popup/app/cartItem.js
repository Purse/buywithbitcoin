import React, {Component} from 'react';
import {connect} from 'react-redux';
import { updateCartItems } from '../../event/actions';
import Product from '../../styles/Product';

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.decrementProduct = this.decrementProduct.bind(this);
    this.incrementProduct = this.incrementProduct.bind(this);
    this.discountedPrice = this.discountedPrice.bind(this);
  }
  
  componentDidMount() {
    this.discountedPrice();
  }

  discountedPrice() {
    const discount = this.props.discount;
    let discountedPrice = parseFloat(this.props.item.fiat_price * (1 - discount));
    discountedPrice = discountedPrice.toFixed(2);
    this.setState({ discountedPrice });
  }

  async cartUpdate(newCart) {
    const { token, username, dispatch, item } = this.props;
    const body = {
      country: item.country,
      name: 'Cart',
      id: 1,
      items: newCart
    };

    await dispatch(updateCartItems(token, username, body));
  }

  async decrementProduct(asin) {
    let needsRemoval;
    let cart = this.props.cart.map((item, index) => {
      if (item.asin === asin) {
        item.quantity -= 1;
      }
      if (item.quantity <= 0) {
        needsRemoval = index;
      }
      return item;
    });

    if (needsRemoval >= 0) {
      cart.splice(needsRemoval, 1);
    }

    await this.cartUpdate(cart);
  }

  async incrementProduct(asin) {
    let cart = this.props.cart.map((item, index) => {
      if (item.asin === asin && item.quantity < item.quantity_available) {
        item.quantity += 1;
      }
      return item;
    });

    await this.cartUpdate(cart);
  }
  countryMap(country) {
    const countries = {
      'UK': '.co.uk',
      'CA': '.ca',
      'JP': '.co.jp',
      'US': '.com'
    };
    return countries[country] || '.com';
  }
  render() {
    const { item } = this.props;
    const productLink = `https://www.amazon${this.countryMap(item.country)}/dp/${item.asin}`;
    const itemImage = (item.images && item.images.small) ? item.images.small: '#';
    return (
      <Product className="row">
        <div className="col-3">
          <img src={itemImage} />
        </div>
        <div className="col-6 product-meta">
          <p onClick={() => {window.open(productLink)}}>{item.name}</p>
          <p><span className="orig-price">${item.fiat_price}</span> 
          <span className="discounted-price">${this.state.discountedPrice || 0}</span></p>
        </div>
        <div className="col-3 product-actions">
          <span onClick={() => { this.decrementProduct(item.asin) }}>&mdash;</span>
          <span>{item.quantity}</span>
          <span onClick={() => { this.incrementProduct(item.asin) }}>+</span>
        </div>
      </Product>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count,
    token: state.token,
    username: state.user.username,
    cart: state.items,
    discount: state.discount
  };
};

export default connect(mapStateToProps)(CartItem);
