import React, { Component } from 'react';
import { connect } from 'react-redux';

class LoggedOut extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="login">
        <img src="https://purse.io/images/bold-icons/cart2.svg" />
          <a target="_blank" href="https://purse.io">Connect Your Account</a>
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

export default connect(mapStateToProps)(LoggedOut);
