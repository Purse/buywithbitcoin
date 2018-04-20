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
          <a target="_blank" href="https://purse.io">Go to Purse to log in</a>
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

export default connect(mapStateToProps)(LoggedOut);
