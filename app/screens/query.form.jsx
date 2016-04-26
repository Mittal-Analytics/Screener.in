"use strict";
var React = require('react');
var QueryBuilder = require('app/components/query.builder.jsx');

function QueryForm(props) {
  return <form method="get" action="/screen/raw/">
    <h3>Query Builder</h3>
    <p>You can customize the query below:</p>
    <QueryBuilder
      name="query"
      placeholder="eg. Book value > Current price"
      value={props.defaults.query}
      error={props.error}
    />
    <div className="checkbox">
      <label>
        <input
          type="checkbox"
          name="latest"
          value="true"
          defaultChecked={props.defaults.latest} />
        Show only latest results?
      </label>
    </div>
    <button className="btn btn-primary" type="submit">
      <i className="glyphicon glyphicon-send"/> Run this query
    </button>
  </form>
}

QueryForm.propTypes = {
  defaults: React.PropTypes.object.isRequired,
  error: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.string
  ])
}

module.exports = QueryForm;
