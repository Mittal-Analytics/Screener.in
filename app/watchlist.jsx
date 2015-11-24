"use strict";
/* global require, document */

var React = require('react');
var WatchlistButton = require('app/modals/watchlist.button.jsx');
var ManageColumns = require('app/modals/columns.modal.jsx');
var Api = require('./api.js');
var Utils = require('app/components/utils.js');
var UserTable = require('./screens/table.jsx');


var Watchlist = React.createClass({

  getInitialState: function() {
    return {screen: false};
  },

  componentDidMount: function() {
    if(!window.loggedIn)
      return (window.location = '/register/');
    this.fetchResults(this.props.location.search);
  },

  componentWillReceiveProps: function(props) {
    this.fetchResults(props.location.search);
  },

  handleChange: function() {
    this.fetchResults(this.props.location.search);
  },

  fetchResults: function(params) {
    var url = '/api/users/watchlist/' + params;
    Api.get(url, params).then(function(response) {
      this.setState({screen: response});
      Utils.setTitle('Watchlist');
    }.bind(this));
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
