var React = require('react');
var ReactDOM = require('react-dom');

/*
 * App
 */

var App = React.createClass({
  render: function () {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
        </div>
        <Order />
        <Inventory />
      </div>
    )
  }
});

/*
 * Header
 */

var Header = React.createClass({
  render: function () {
    return (
      <header className="top">
        <h1>Catch
          <span className="ofThe">
            <span className="of">
              of
            </span>
            <span className="the">
              the
            </span>
          </span>
          day
        </h1>
        <h3 className="tagline"><span>{this.props.tagline}</span></h3>
      </header>
    )
  }
});

/*
 * Inventory
 */

var Inventory = React.createClass({
  render: function () {
    return (
      <p>Inventory</p>
    )
  }
});

/*
 * Order
 */

var Order = React.createClass({
  render: function () {
    return (
      <p>Order</p>
    )
  }
});

/*
 * Store Picker
 * This will let us make <StorePicker />
 */

var StorePicker = React.createClass({

  render: function () {
    var name = "Matt";
    return (
      <form className="store-selector">
        <h2>Please Enter A Store {name}</h2>
        <input type="text" ref="storeId" />
        <input type="Submit" value="Submit" />
      </form>
    )
  }

});


ReactDOM.render(<App />, document.querySelector('#main'));
