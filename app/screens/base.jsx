"use strict";
/* global require, document */

var React = require('react');
var QueryBuilder = require('./builder.jsx');
var Alerts = require('app/components/alerts.jsx');


function ScreenBase(props) {
  var errors = props.errors;
  var loaded = props.screen;
  var loading = !loaded && !errors;
  var queryError = errors && errors.json.query;
  var results;
  if(loaded)
    results = props.children;
  if(loading)
    results = <h3>Fetching screen results...</h3>;
  if(errors)
    results = <Alerts errors={errors}></Alerts>;
  // Show builder only once default values are available
  var builder = props.builderDefaults && <QueryBuilder
    defaults={props.builderDefaults}
    error={queryError} />;
  return <div>
    {results}
    {builder}
  </div>;
}

module.exports = ScreenBase;
