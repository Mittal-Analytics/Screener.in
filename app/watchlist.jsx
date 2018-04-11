"use strict";
/* global require, document */

import React from 'react'
import WatchlistButton from './modals/watchlist.button.jsx'
import ManageColumns from './modals/columns.modal.jsx'
import api from './api.js'
import {setTitle} from './components/utils.js'
import UserTable from './screens/table.jsx'


var Watchlist = React.createClass({

  getInitialState: function() {
    return {screen: false};
  },

  componentDidMount: function() {
    if(!window.loggedIn)
      return (window.location = '/register/');
    this._req = this.fetchResults(this.props.location.query)
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
      setTitle('Watchlist');
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
            style="info"
          /> <ManageColumns
            onClose={this.handleChange}
            className="btn btn-default"
          />
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

export default Watchlist
