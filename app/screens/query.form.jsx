"use strict";
var React = require('react');
var QueryBuilder = require('../components/query.builder.jsx');

function QueryForm(props) {
  var assist = {
    lead: 'Custom Query Example',
    description: <p>
      Price to earning &lt; 15 AND
      <br />
      Return on capital employed &gt; 22%
    </p>,
    help: <a
      href="http://blog.screener.in/2012/07/creating-stock-screens/"
      >Detailed guide on creating stock screens
    </a>
  }

  var updateField
  if(props.defaults.is_owner && props.defaults.id)
    updateField = <input type="hidden" name="update" value={props.defaults.id} />

  return <form method="get" action="/screen/raw/">
    <h3>Query Builder</h3>
    <p>You can customize the query below:</p>
    <QueryBuilder
      name="query"
      placeholder="eg. Book value > Current price"
      assist={assist}
      value={props.defaults.query}
      error={props.error}
    />
    <div className="checkbox">
      <label>
        <input
          type="checkbox"
          name="latest"
          defaultValue="true"
          defaultChecked={props.defaults.latest} />
        Show only latest results?
      </label>
    </div>
    {updateField}
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
