/*
 * Store Picker
 * This will let us make <StorePicker />
 */
import React from 'react';
import { History } from 'react-router';
import reactMixin from 'react-mixin';
import helpers from '../helpers';

class StorePicker  extends React.Component {

  goToStore (event) {
    event.preventDefault();
    var storeId = this.refs.storeId.value;
    this.history.pushState(null, '/store/' +storeId);
  }

  render () {
    var name = "Matt";
    return (
      <form className="store-selector" onSubmit={this.goToStore.bind(this)}> //bind(this) is used to tell the function what it should map its 'this' to
        <h2>Please Enter A Store {name}</h2>
        <input type="text" ref="storeId" defaultValue={helpers.getFunName()} />
        <input type="Submit" defaultValue="Submit"/>
      </form>
    )
  }
};

reactMixin.onClass(StorePicker, History);

export default StorePicker;