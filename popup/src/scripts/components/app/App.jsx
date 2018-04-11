import React, {Component} from 'react';
import {connect} from 'react-redux';
import CartItem from './cartItem';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener('click', () => {
      this.props.dispatch({
        type: 'ADD_COUNT'
      });
    });
  }

  render() {
    let cartItems = [];
    if (this.props.cart && this.props.cart.length) {
      cartItems = this.props.cart.map((item, iter) => {
        return (<CartItem key={iter} item={item} />)
      });
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col header">
            <h2>Shopping Cart</h2>
            <p>{this.props.username}</p>
          </div>
        </div>
        { cartItems.length &&
          cartItems }
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

export default connect(mapStateToProps)(App);
