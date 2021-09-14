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
          <a target="_blank" rel="noreferrer" href="https://purse.io">Connect Your Account</a>
        </div>
      </div>
    );
  }
}

export default connect()(LoggedOut);
