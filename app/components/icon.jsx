"use strict";
var React = require('react');


function Icon(props) {
  var name = "glyphicon glyphicon-" + props.name;
  return <i
    className={name} />;
}


module.exports = Icon;
