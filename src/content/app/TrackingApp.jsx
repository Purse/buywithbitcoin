import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import styles from '../../styles/amazon.button.css';

class TrackingApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: ''
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    try {
      const pageState = document.querySelector('[data-a-state=\'{"key":"page-state"}\']');
      const trackingId = JSON.parse(pageState.innerText).trackingId.trim();
      const amazonOrderId = location.href.match(/orderId=(\d{3}-\d{7}-\d{7})/)[1];
      const statusEl = document.querySelector('#primaryStatus');
      if (!amazonOrderId) {
        throw new Error('Cannot retrieve amazonOrderId from URL');
      }
      if (trackingId) {
        let href = `https://purse.io/add-tracking/${amazonOrderId}/${trackingId}?ref=ChromePurse`;
        if (statusEl) {
          href += `&status=${encodeURIComponent(statusEl.innerText)}`;
        }
        this.setState({
          buttonText: `Send Tracking: ${trackingId}`,
          trackingHref: href
        });
      } else {
        this.setState({ buttonText: 'package hasn\'t been shipped yet. Try again once it\'s been shipped'});
      }
    } catch (error) {
      console.log('Tracking Error:', error);
      this.setState({ buttonText: 'Unable to get Tracking Info' });
    }
  }

  _debounce(cb, time) {
    let timeout;
    return function () {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        cb.apply(this, arguments);
      }, time);
    };
  }

  navToPurse() {
    const amazonUrl = document.location.href;
    document.location = `https://purse.io/shop?ext_redirect=${amazonUrl}`;
  }

  render() {
    const isLoggedIn = this.props.token;
    const isNotLoggedIn = !this.props.token;

    return (
      <div className={styles.dislayStyle}>
      {isLoggedIn && this.state.trackingHref &&
        <a href={this.state.trackingHref} className={styles.unAuthed}>
          {this.state.buttonText}
        </a>}
      {isLoggedIn && !this.state.trackingHref &&
        <span className={styles.unAuthed}>{this.state.buttonText}</span>
      }
      {isNotLoggedIn &&
        <button className={styles.unAuthed} onClick={this.navToPurse}>
          Log in at Purse.io
        </button>}
      </div>
    );
  }
}

TrackingApp.defaultProps = {
  buttonText: 'Loading...',
  trackingHref: null
};

TrackingApp.propTypes = {
  dispatch: PropTypes.func,
  buttonText: PropTypes.string,
  token: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
    username: state.user.username,
  };
};

export default connect(mapStateToProps)(TrackingApp);
