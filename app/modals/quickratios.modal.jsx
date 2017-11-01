"use strict";
import React from 'react'
import Modal from '../components/modal.jsx'
import Api from '../api.js'
import ActionRows from './action.rows.jsx'


var QuickRatiosModal = React.createClass({
  propTypes: {
    items: React.PropTypes.array.isRequired,
    onClose: React.PropTypes.func.isRequired,
  },

  getDisplayName: function(item) {
    return item[0];
  },

  onOpen: function() {},

  handleRemove: function(ratio) {
    var name = this.getDisplayName(ratio);
    var data = {ratio: name};
    return Api.delete(['users', 'quick_ratio'], data);
  },

  render: function() {
    return <Modal
      onOpen={this.onOpen}
      onClose={this.props.onClose}
      style="default"
      icon="plus"
      name="Manage quick ratio"
      >
      <ActionRows
        getDisplayName={this.getDisplayName}
        handleRemove={this.handleRemove}
        items={this.props.items}
      />
    </Modal>;
  }

});

export default QuickRatiosModal
