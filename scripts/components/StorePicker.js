/*
 * Store Picker
 * This will let us make <StorePicker />
 */
import React from 'react';
import { History } from 'react-router';
import helpers from '../helpers';

var StorePicker = React.createClass({
  mixins: [History],
  goToStore: function (event) {
    event.preventDefault();
    var storeId = this.refs.storeId.value;
    this.history.pushState(null, '/store/' +storeId);
  },
  render: function () {
    var name = "Matt";
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store {name}</h2>
        <input type="text" ref="storeId" defaultValue={helpers.getFunName()} />
        <input type="Submit" defaultValue="Submit"/>
      </form>
    )
  }

});

export default StorePicker;