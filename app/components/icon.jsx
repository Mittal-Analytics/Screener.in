"use strict";
var React = require('react');


function Icon(props) {
  var name = "glyphicon glyphicon-" + props.name;
  return <i
    className={name} />;
}

Icon.propTypes = {
  name: React.PropTypes.string.isRequired
}

module.exports = Icon;
