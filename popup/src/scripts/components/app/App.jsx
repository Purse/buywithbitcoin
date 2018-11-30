import React, {Component} from 'react';
import {connect} from 'react-redux';
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
    token: state.token
  };
};

export default connect(mapStateToProps)(App);
