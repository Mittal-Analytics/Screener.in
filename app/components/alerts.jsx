"use strict";
/* global require, document, window */

var React = require('react');
var map = require('lodash/map');
var startCase = require('lodash/startCase');
var Icon = require('app/components/icon.jsx');


function Alerts(props) {
  if(!props.errors)
    return <div></div>;
  var title = props.errors.message;
  var errors = map(props.errors.json, function(error, key) {
    var name = startCase(key);
    return <p key={key}>
      <strong>{name}</strong>: {error}
    </p>;
  });
  return <div className="alert alert-danger" role="alert">
    <p>
      <Icon name="exclamation-sign"/> {title}
    </p>
    {errors}
  </div>;
}


module.exports = Alerts;
