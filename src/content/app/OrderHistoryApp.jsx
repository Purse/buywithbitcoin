import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../styles/amazon.button.css';
import PropTypes from 'prop-types';
import {render} from 'react-dom';
import OrderItem from './OrderItem';

class OrderHistoryApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    // TODO Queries orders on page, and present purse order information for each.
    // const orderEls = document.querySelectorAll('.js-order-card');
    // for (const orderEl of orderEls) {
    //   const amazonOrderId = orderEl.querySelector('.order-info .actions .a-color-secondary.value');
    //   const anchor = document.createElement('div');
    //   amazonOrderId.after(anchor);
    //   const purseOrder = amazonOrderId.innerText;
    //   if (amazonOrderId) {
    //     render(
    //       <OrderItem purseOrder={purseOrder} />,
    //       anchor
    //     );
    //   }
    // }
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
      <div className='dislayStyle'>
      {isLoggedIn &&
        <span></span>
      }
      {isNotLoggedIn &&
        <button className="unAuthed" onClick={this.navToPurse}>
          Log in at Purse.io
        </button>}
      </div>
    );
  }
}

OrderHistoryApp.defaultProps = {
};

OrderHistoryApp.propTypes = {
  dispatch: PropTypes.func,
  token: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
    username: state.user.username,
  };
};

export default connect(mapStateToProps)(OrderHistoryApp);
