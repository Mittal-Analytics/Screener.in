"use strict";
/* global require, document */

var React = require('react');
var classNames = require('classnames');
var Button = require('app/components/button.jsx');

var Confirm = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func.isRequired,
    style: React.PropTypes.string,
    icon: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
  },

  getInitialState: function() {
    return {showConfirm: false};
  },

  handleShowConfirm: function() {
    this.setState({showConfirm: true});
  },

  handleConfirm: function() {
    this.setState({showConfirm: false});
    this.props.onClick();
  },

  handleCancel: function() {
    this.setState({showConfirm: false});
  },

  render: function() {
    var part1cls = classNames({hide: this.state.showConfirm});
    var part2cls = classNames({hide: !this.state.showConfirm});
    var icon = this.props.icon || "trash";
    return <span>
      <span className={part1cls}>
        <Button
          style={this.props.style || "danger"}
          icon={icon}
          onClick={this.handleShowConfirm}
          name={this.props.name}
        />
      </span>
      <span className={part2cls}>
        <strong>Sure?</strong> <Button
          style="danger"
          onClick={this.handleConfirm}
          name="Yes"
        /> <Button
          style="link"
          onClick={this.handleCancel}
          name="Cancel"
        />
      </span>
    </span>;
  }
});

module.exports = Confirm;
