import React, {Component} from 'react';
import {connect} from 'react-redux';

class CartItem extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const productLink = `https://www.amazon.com/gp/product/${this.props.item.asin}`;
    return (
      <div className="row">
        <div className="col-3">
          <p><img src={this.props.item.images.small} /></p>
        </div>
        <div className="col-9">
          <p><a target="_blank" href={productLink}>{this.props.item.name}</a></p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count,
    token: state.token,
    username: state.username,
    cart: state.cart
  };
};

export default connect(mapStateToProps)(CartItem);
