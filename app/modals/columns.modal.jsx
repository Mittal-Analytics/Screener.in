"use strict";
/* global require, window */
var React = require('react');
var Modal = require('app/components/modal.jsx');
var Confirm = require('app/components/confirm.jsx');
var RatioSearch = require('app/components/ratio.search.jsx');
var api = require('../api.js');
var ActionRows = require('./action.rows.jsx');


var ManageColumns = React.createClass({
  propTypes: {
    onClose: React.PropTypes.func.isRequired,
    style: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      items: []
    };
  },

  onOpen: function() {
    this.req = api.get(api.me).then(resp => {
      this.setState({
        items: resp.icolumns.split(';')
      });
    });
  },

  handleAdd: function(ratio) {
    var name = ratio.name;
    var data = {'ratio': name};
    return api.post(['users', 'column'], data).then(() => {
      this.setState({
        items: this.state.items.concat([name])
      });
    });
  },

  handleRemove: function(ratio) {
    var name = this.getDisplayName(ratio);
    var data = {'ratio': name};
    return api.delete(['users', 'column'], data);
  },

  handleReset: function() {
    var data = {columns: ''};
    return api.patch(['users', window.userId], data).then(resp => {
      this.setState({
        items: resp.icolumns.split(';')
      });
    });
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
