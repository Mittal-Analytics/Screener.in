"use strict";
/* global require, window */
var React = require('react');
var Modal = require('app/components/modal.jsx');
var CompanySearch = require('app/components/company.search.jsx');
var Api = require('../api.js');
var ActionRows = require('./action.rows.jsx');


var WatchlistButton = React.createClass({
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
    Api.get(['company']).then(function(response) {
      this.setState({
        items: response,
      });
    }.bind(this));
  },

  onClose: function() {
    this.props.onClose();
  },

  handleAdd: function(company) {
    Api.post(Api.cid(company.id, 'favorite')).then(function() {
      this.setState({
        items: this.state.items.concat([company])
      });
    }.bind(this));

  },

  handleRemove: function(company) {
    return Api.post(Api.cid(company.id, 'unfavorite'));
  },

  getDisplayName: function(item) {
    return item.name;
  },

  render: function() {
    var style = this.props.style || 'default';
    return <Modal
      style={style}
      icon="plus"
      name="Add Companies"
      onOpen={this.onOpen}
      onClose={this.onClose}
      >
      <div>
        <CompanySearch onSelect={this.handleAdd} large={true} />
        <br />
        <ActionRows
          items={this.state.items}
          handleRemove={this.handleRemove}
          getDisplayName={this.getDisplayName}
        />
      </div>
    </Modal>;
  }
});

module.exports = WatchlistButton;
