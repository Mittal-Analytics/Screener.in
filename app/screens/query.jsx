"use strict";
/* global require, document */

var React = require('react');
var ManageColumns = require('app/modals/columns.modal.jsx');
var SaveScreenModal = require('app/modals/savescreen.modal.jsx');
var Utils = require('app/components/utils.js');
var Api = require('../api.js');
var UserTable = require('./table.jsx');
var ScreenBase = require('./base.jsx');
var isEqual = require('lodash/isEqual');


var Query = React.createClass({

  getInitialState: function() {
    return {errors: false, screen: false};
  },

  componentDidMount: function() {
    this.fetchResults(this.props.location.search);
  },

  componentWillReceiveProps: function(props) {
    var new_params = props.location.search;
    var old_params = this.props.location.search;
    if(!isEqual(new_params, old_params))
      this.fetchResults(new_params);
  },

  onColumnsChange: function() {
    this.fetchResults(this.props.location.search);
  },

  fetchResults: function(params) {
    Utils.setTitle('Query Builder');
    var url = '/api/screens/query/' + params;
    Api.get(url).then(function(response) {
      this.setState({screen: response, errors: false});
    }.bind(this), function(response) {
      this.setState({errors: response, screen: false});
    }.bind(this));
  },

  renderLoaded: function() {
    var screen = this.state.screen;
    var save = <SaveScreenModal screen={screen} />;
    var manageCols = <ManageColumns
      onClose={this.onColumnsChange}
      style="default"/>;
    return <div>
      <div className="page-header">
        <div className="pull-right">
          {save} {manageCols}
        </div>
        <h2>Query Results</h2>
      </div>
      <UserTable
        page={screen.page}
        link="/screen/raw/"
        query={this.props.location.query}/>
    </div>;
  },

  render: function() {
    return <ScreenBase
      errors={this.state.errors}
      screen={this.state.screen}
      builderDefaults={this.props.location.query}
      >
      {this.state.screen && this.renderLoaded()}
    </ScreenBase>;
  }
});

module.exports = Query;
