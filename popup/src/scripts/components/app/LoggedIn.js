import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartItem from './cartItem';

class LoggedIn extends Component {
  constructor(props) {
    super(props);

  }
  
  checkout() {
    window.open('https://purse.io/checkout/nyd');
  }

  render() {
    let cartItems = [];
    if (this.props.cart && this.props.cart.length) {
      cartItems = this.props.cart.map((item, iter) => {
        return (<CartItem key={iter} item={item} />)
      });
    }
    
    return (
      <div>
        <div className="row header">
          <div className="col-8">
            <h2>Shopping Cart</h2>
            <p>{this.props.username}</p>
          </div>
          { cartItems.length &&
            <div className="col-4">
              <button className="checkout"
                      onClick={this.checkout}>
                <span>Finalize</span>
              </button>
            </div>
          }
        </div>
        { cartItems.length ? cartItems : <p>You have no items in your Purse List</p> } 
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

export default connect(mapStateToProps)(LoggedIn);
