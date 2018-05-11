import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getUser } from '../../../../../api/user';
import { getCart } from '../../../../../api/cart';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';
import { getCartItems } from '../../../../../event/src/actions';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.token) {
      this.props.dispatch(getCartItems(this.props.token));
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
