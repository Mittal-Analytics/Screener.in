"use strict";
/* global require, document */

var React = require('react');
var ManageColumns = require('app/modals/columns.modal.jsx');
var Confirm = require('app/components/confirm.jsx');
var Notify = require('app/components/notify.jsx');
var Api = require('../api.js');
var Utils = require('app/components/utils.js');
var UserTable = require('./table.jsx');
var ScreenBase = require('./base.jsx');


var Screen = React.createClass({

  getInitialState: function() {
    return {errors: false, screen: false};
  },

  componentDidMount: function() {
    this.fetchResults(this.props.params.screenId, this.props.location.search);
  },

  componentWillReceiveProps: function(props) {
    var new_id = props.params.screenId;
    var old_id = this.props.params.screenId;
    var new_params = props.location.search;
    var old_params = this.props.location.search;
    if(new_params != old_params || new_id != old_id)
      this.fetchResults(new_id, new_params);
  },

  onColumnsChange: function() {
    this.fetchResults(this.props.params.screenId,
                      this.props.location.search);
  },

  fetchResults: function(screenId, params) {
    var url = '/api/screens/' + screenId + '/'+ params;
    Api.get(url).then(function(response) {
      Utils.setTitle(response.name);
      this.setState({screen: response, errors: false});
    }.bind(this), function(response) {
      this.setState({errors: response, screen: false});
    }.bind(this));
  },

  handleDelete: function() {
    var screenId = this.props.params.screenId;
    return Api.delete(['screens', screenId]).then(function(response) {
      this.props.history.pushState(null, '/dash/');
    }.bind(this));
  },

  handleAlert: function() {
    var data = {screen: this.state.screen.id};
    return Api.post(['alerts'], data);
  },

  renderLoaded: function() {
    var screen = this.state.screen;
    var alert = !screen.has_alert && <Notify
      style="info"
      icon="bell"
      onClick={this.handleAlert}
      name="Set Alert"/>;
    var deleteScreen = screen.is_owner && <Confirm
      onClick={this.handleDelete}
      name="Delete this screen"/>;
    var manageCols = <ManageColumns
      onClose={this.onColumnsChange}
      className="btn btn-default"/>;
    return <div>
      <div className="page-header">
        <div className="pull-right">
          {alert} {deleteScreen} {manageCols}
        </div>
        <h2>
          {screen.name}
          <small> {screen.description}</small>
        </h2>
      </div>

      <UserTable
        page={screen.page}
        link={this.props.location.pathname}
        query={this.props.location.query}
      />
  </div>;
  },

  render: function() {
    return <ScreenBase
      errors={this.state.errors}
      screen={this.state.screen}
      builderDefaults={this.state.screen}
      >
      {this.state.screen && this.renderLoaded()}
    </ScreenBase>;
  }
});

module.exports = Screen;
