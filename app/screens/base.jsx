"use strict";
import React from 'react'
import QueryForm from './query.form.jsx'
import Alerts from '../components/alerts.jsx'


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
  var builder = props.builderDefaults && <QueryForm
    defaults={props.builderDefaults}
    error={queryError} />;
  return <div>
    {results}
    {builder}
  </div>;
}

export default ScreenBase
