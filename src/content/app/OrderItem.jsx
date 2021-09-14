import React, {Component} from 'react';
import PropTypes from 'prop-types';

class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return (
      <span>{this.props.purseOrder}</span>
    );
  }
}

OrderItem.propTypes = {
  purseOrder: PropTypes.string,
};

export default OrderItem;
