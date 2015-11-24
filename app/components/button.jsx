"use strict";
var React = require('react');

function Button(props) {
  var classes = 'btn btn-' + (props.style || 'default');
  var icon = props.icon && 'glyphicon glyphicon-' + props.icon;
  icon = icon && <i className={icon} />;
  return <button
    type="button"
    onClick={props.onClick}
    className={classes}
    disabled={props.disabled}
    >
    {icon} {props.name}
  </button>;
}

module.exports = Button;
