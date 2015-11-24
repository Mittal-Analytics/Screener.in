"use strict";
/* global require, window */
var React = require('react');
var Modal = require('app/components/modal.jsx');
var Confirm = require('app/components/confirm.jsx');
var RatioSearch = require('app/components/ratio.search.jsx');
var Api = require('../api.js');
var ActionRows = require('./action.rows.jsx');


var ManageColumns = React.createClass({
  propTypes: {
    onClose: React.PropTypes.func.isRequired,
    style: React.PropTypes.string,
  },

  getInitialState: function() {
    return {
      items: [],
    };
  },

  onOpen: function() {
    Api.get(Api.me).then(function(response) {
      this.setState({
        items: response.icolumns.split(';'),
      });
    }.bind(this));
  },

  handleAdd: function(ratio) {
    var name = ratio.name;
    var data = {'ratio': name};
    Api.post(['users', 'column'], data).then(function() {
      this.setState({
        items: this.state.items.concat([name])
      });
    }.bind(this));
  },

  handleRemove: function(ratio) {
    var name = this.getDisplayName(ratio);
    var data = {'ratio': name};
    return Api.delete(['users', 'column'], data);
  },

  handleReset: function() {
    var data = {columns: ''};
    Api.patch(['users', window.userId], data).then(function(response) {
      this.setState({
        items: response.icolumns.split(';'),
      });
    }.bind(this));
  },

  getDisplayName: function(item) {
    return item;
  },

  render: function() {
    return <span>
      <Modal
        onOpen={this.onOpen}
        onClose={this.props.onClose}
        style={this.props.style || 'default'}
        icon="pencil"
        name="Customize columns"
        title="Choose display columns"
        >
        <div>
          <RatioSearch onSelect={this.handleAdd} />
          <br />
          <ActionRows
            getDisplayName={this.getDisplayName}
            handleRemove={this.handleRemove}
            items={this.state.items} />
          <Confirm
            style="default"
            icon="repeat"
            onClick={this.handleReset}
            name="Reset to default" />
        </div>
      </Modal>
    </span>;
  }

});


module.exports = ManageColumns;
