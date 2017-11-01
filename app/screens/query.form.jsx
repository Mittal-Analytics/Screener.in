import React from 'react'
import QueryBuilder from '../components/query.builder.jsx'


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

  var defaults = props.defaults
  var uid = defaults.is_owner ? defaults.id : defaults.update
  var updateField = uid && <input type="hidden" name="update" value={uid} />

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

export default QueryForm
