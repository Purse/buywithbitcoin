import React, {Component} from 'react';
import {connect} from 'react-redux';

class CartItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const productLink = `https://www.amazon.com/gp/product/${this.props.item.asin}`;
    const itemImage = (this.props.item.images && this.props.item.images.small) ? this.props.item.images.small: '#';
    return (
      <div className="row product">
        <div className="col-3">
          <img src={itemImage} />
        </div>
        <div className="col-9">
          <a target="_blank" href={productLink}>{this.props.item.name}</a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count,
    token: state.token,
    username: state.user.name,
    cart: state.cart
  };
};

export default connect(mapStateToProps)(CartItem);
