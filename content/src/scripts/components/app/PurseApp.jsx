import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToken, getUserInfo,
  getCartItems } from '../../../../../event/src/actions/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (!this.state.token) {
      document.cookie.split('; ').forEach((cookie) => {
        const cookieKeyVal = cookie.split('=');
        if (cookieKeyVal[0] === 'purse_token') {
          this.props.dispatch(addToken(cookieKeyVal[1]));
          this.props.dispatch(getCartItems(cookieKeyVal[1]));
          this.props.dispatch(getUserInfo(cookieKeyVal[1]))
            .then(() => {
              if (document.location.search.match(/amazon/g)) {
                const amazonUrl = document.location.search.split('=')[1];
                document.location = amazonUrl;
              }
            });
        }
      });
    }
  }

  render() {
    return '';
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(App);
