import React, {Component} from 'react';
import {connect} from 'react-redux';
import CartItem from './cartItem';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // chrome.browserAction.enable();
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
        <div className="col">
          <div className="row">
          Shopping as {this.props.username}!
          </div>
          <div className="row">
            <div className="col">
              <div className="row">
                <p>Current Cart</p>
              </div>
            { cartItems.length &&
              cartItems }
            </div>
          </div>
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

export default connect(mapStateToProps)(App);
