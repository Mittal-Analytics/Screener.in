"use strict";
/* global require, document */

var React = require('react');
var WatchlistButton = require('app/modals/watchlist.button.jsx');
var ManageColumns = require('app/modals/columns.modal.jsx');
var api = require('app/api.js');
var Utils = require('app/components/utils.js');
var UserTable = require('./screens/table.jsx');


var Watchlist = React.createClass({

  getInitialState: function() {
    return {screen: false};
  },

  componentDidMount: function() {
    if(!window.loggedIn)
      return (window.location = '/register/');
    return this.fetchResults(this.props.location.query);
  },

  componentWillReceiveProps: function(props) {
    return this.fetchResults(props.location.query);
  },

  handleChange: function() {
    return this.fetchResults();
  },

  fetchResults: function(params) {
    var url = '/users/watchlist/';
    return api.get(url, params).then(resp => {
      this.setState({screen: resp});
      Utils.setTitle('Watchlist');
    });
  },

  render: function() {
    var screen = this.state.screen;
    if(!screen)
      return <h3>Loading...</h3>;
    return <div>
      <div className="page-header">
        <div className="pull-right">
          <WatchlistButton
            onClose={this.handleChange}
            style="info"/>
          <ManageColumns
            onClose={this.handleChange}
            className="btn btn-default"/>
        </div>
        <h2>
          Stock Watchlist
        </h2>
      </div>

      <UserTable
        page={screen}
        link={this.props.location.pathname}
        query={this.props.location.query}
      />
    </div>;
  }
});

module.exports = Watchlist;
