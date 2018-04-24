import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getUser } from '../../../../../api/user';
import { getCart } from '../../../../../api/cart';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.token) {
      getUser(this.props.token)
        .then((username) => {
          getCart(this.props.token)
            .then((cart) => {
              let items;
              
              if (!cart) {
                items = [];
              } else {
                items = cart[0].items;
              }
              
              this.props.dispatch({
                type: 'ADD_USERNAME',
                username: username
              });
              
              this.props.dispatch({
                type: 'ADD_CART_ITEMS',
                items: items
              });
            });
        });
    }
  }

  render() {
    const hasToken = this.props.token || false;
    return (
        <div className="container">
          { hasToken ? (<LoggedIn />) : (<LoggedOut />) }
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
