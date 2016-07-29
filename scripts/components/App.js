/*
 * App
 */

import React from 'react';
import Catalyst from 'react-catalyst';
import reactMixin from 'react-mixin';

//Components
import Header from './Header';
import Fish from './Fish';
import Order from './Order';
import Inventory from './Inventory';

//Firebase
import Rebase from 're-base';
var base = Rebase.createClass('https://react-for-beginners-45009.firebaseio.com');

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      fishes: {},
      order: {}
    }
  }

  componentDidMount () {
    base.syncState(this.props.params.storeId + '/fishes', {
      context: this,
      state: 'fishes'
    });

    var localStorageRef = localStorage.getItem('order-' + this.props.params.storeId);

    if(localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUpdate (nextProps, nextState) {
    localStorage.setItem('order-' + this.props.params.storeId, JSON.stringify(nextState.order));
  }

  addToOrder (key) {
    this.state.order[key] = this.state.order[key] + 1 || 1;
    this.setState({ order: this.state.order });
  }

  removeFromOrder (key) {
    delete this.state.order[key];
    this.setState({
      order: this.state.order
    });
  }

  addFish (fish) {
    var timestamp = (new Date()).getTime();
    this.state.fishes['fish-' + timestamp] = fish;
    this.setState({ fishes: this.state.fishes });
  }

  removeFish (key) {
    this.state.fishes[key] = null;
    this.setState({
      fishes: this.state.fishes
    });
  }

  loadSamples () {
    this.setState({
      fishes: require('../sample-fishes')
    });
  }

  renderFish (key) {
    return <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder.bind(this)}/>
  }

  render () {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes).map(this.renderFish.bind(this))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder.bind(this)}/>
        <Inventory addFish={this.addFish.bind(this)} removeFish={this.removeFish.bind(this)} loadSamples={this.loadSamples.bind(this)} fishes={this.state.fishes} linkState={this.linkState.bind(this)}/>
      </div>
    )
  }
};

reactMixin.onClass(App, Catalyst.LinkedStateMixin);

export default App;