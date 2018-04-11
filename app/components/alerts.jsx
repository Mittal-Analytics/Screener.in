"use strict";
import React from 'react'
import map from 'lodash/map'
import startCase from 'lodash/startCase'
import Icon from './icon.jsx'


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

export default Alerts
