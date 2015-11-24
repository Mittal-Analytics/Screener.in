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
    return {status: 'initial'};
  },

  handleClick: function() {
    this.setState({status: 'pending'});
    this.req = this.props.onClick().then(
      function() {
        this.setState({status: 'done'});
      }.bind(this),
      function() {
        this.setState({status: 'failed'});
      }.bind(this)
    );
  },

  render: function() {
    var name = this.props.name;
    var disabled = false;
    var style = this.props.style || 'info';
    var icon = this.props.icon;
    switch (this.state.status) {
      case 'pending':
        name = 'Processing...';
        disabled = true;
        break;
      case 'failed':
        name = 'Failed! Retry?';
        style = 'warning';
        disabled = false;
        break;
      case 'done':
        name = 'Done';
        style = 'link';
        icon = 'ok';
        disabled = true;
        break;
    }
    return <Button
      style={style}
      icon={icon}
      onClick={this.handleClick}
      name={name}
      disabled={disabled}/>;
  }
});

module.exports = Confirm;
