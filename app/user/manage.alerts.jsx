"use strict";
var React = require('react');
var Api = require('../api.js');
var ActionRows = require('app/modals/action.rows.jsx');
var Utils = require('app/components/utils.js');
var Button = require('app/components/button.jsx');


var Alerts = React.createClass({
  getInitialState: function() {
    return {
      screens: false,
      watchlistAlert: true,
    };
  },

  componentDidMount: function() {
    if(!window.loggedIn)
      return (window.location = '/register/');
    Utils.setTitle('Manage Alerts');
    Api.get(['alerts']).then(function(response) {
      this.setState({screens: response});
    }.bind(this));
    Api.get(['users', 'me']).then(function(response) {
      this.setState({
        watchlistAlert: response.watchlist_alert
      });
    }.bind(this));
  },

  getDisplayName: function(item) {
    return item.name;
  },

  handleRemove: function(item) {
    return Api.delete(['alerts', item.id]);
  },

  handleWatchlistToggle: function() {
    var newValue = !this.state.watchlistAlert;
    var url = ['users', window.userId];
    var data = {watchlist_alert: newValue};
    Api.patch(url, data).then(function(response) {
      this.setState({watchlistAlert: newValue});
    }.bind(this));
  },

  render: function() {
    var current, toggle, btnCls, actions;
    if(this.state.watchlistAlert) {
      current = 'Enabled';
      toggle = 'Disable';
      btnCls = 'danger';
    } else {
      current = 'Disabled';
      toggle = 'Enable';
      btnCls = 'primary';
    }
    if(this.state.screens) {
      actions = <ActionRows
        getDisplayName={this.getDisplayName}
        handleRemove={this.handleRemove}
        items={this.state.screens.results}
      />;
    } else {
      actions = <p>No screen alerts set.</p>;
    }
    return <div>
      <h2 className="page-header">Manage Alerts</h2>
      <h3>Screen Alerts</h3>
      {actions}
      <h3>
        Watchlist alerts are currently {current}: <Button
          style={btnCls}
          onClick={this.handleWatchlistToggle}
          name={toggle}
        />
      </h3>
    </div>;
  }
});


module.exports = Alerts;
