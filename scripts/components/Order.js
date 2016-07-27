/*
 * Order
 */

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
  import helpers from '../helpers';

var Order = React.createClass({
  renderOrder: function (key) {
    var fish = this.props.fishes[key];
    var count = this.props.order[key];
    var removeButton = <button onClick={this.props.removeFromOrder.bind(null, key)}>&times;</button>
    if (!fish) {
      return <li key={key}>Sorry, fish no longer available! {removeButton}</li>
    }
    return (
      <li key={key}>
        <span>
          <ReactCSSTransitionGroup
            className="count"
            component="span"
            transitionName="count"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}>
            <span key={count}>{count}</span>
          </ReactCSSTransitionGroup>
          lbs {fish.name} {removeButton}
        </span>
        <span className="price">{helpers.formatPrice(count * fish.price)}</span>
      </li>
    )
  },
  render: function () {
    var orderIds = Object.keys(this.props.order);
    var total = orderIds.reduce((prevTotal, key)=> {
      var fish = this.props.fishes[key];
      var count = this.props.order[key];
      var isAvailable = fish && fish.status === 'available';

      if(fish && isAvailable) {
        return prevTotal + (count * parseInt(fish.price) || 0);
      }

      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2 className="order-title"></h2>
        <ReactCSSTransitionGroup
          className="order"
          component="ul"
          transitionName="order"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total: </strong>
            {helpers.formatPrice(total)}
          </li>
        </ReactCSSTransitionGroup>
      </div>
    )
  },
  propTypes: {
    fishes: React.PropTypes.object.isRequired,
    order: React.PropTypes.object.isRequired,
    removeFromOrder: React.PropTypes.func.isRequired
  }
});

export default Order;