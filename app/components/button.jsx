"use strict";
import React from 'react'
import classNames from 'classnames'

function Button(props) {
  var classes = 'btn btn-' + (props.style || 'default');
  classes = classNames(classes, props.className)
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

Button.propTypes = {
  style: React.PropTypes.string,
  className: React.PropTypes.string,
  icon: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired,
  name: React.PropTypes.string.isRequired
}

export default Button
