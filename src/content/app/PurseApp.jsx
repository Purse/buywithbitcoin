import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToken, getUserInfo, getCartItems } from '../../event/actions/index';
import PropTypes from 'prop-types';

class PurseApp extends Component {
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
              const params = new URLSearchParams(window.location.search);
              if (params.has('ext_redirect') && params.get('ext_redirect').includes('amazon.')) {
                const amazonUrl = params.get('ext_redirect');
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

PurseApp.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(PurseApp);
