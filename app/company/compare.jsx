"use strict";
import React from 'react'
import CompanySearch from '../components/company.search.jsx'
import Button from '../components/button.jsx'


function AddCompare(props) {

  function renderRemoveOptions() {
    if (props.comparisons.length == 0)
      return
    return <div className="pull-right">
      <Button
        style="danger"
        icon="remove"
        onClick={props.onRemove}
        name="Disable Comparison"
      />
    </div>
  }

  function renderStart() {
    return <Button
      style="default"
      icon="plus"
      onClick={props.onStart}
      name="Add Detailed Comparison"
    />
  }

  if(props.comparisons.length == 0)
    return renderStart()

  return <div>
    <div className="col-md-4">
      <CompanySearch
        placeholder="Company name for comparison"
        onSelect={props.onAdd}
      />
    </div>
    {renderRemoveOptions()}
  </div>
}

AddCompare.propTypes = {
  onStart: React.PropTypes.func.isRequired,
  onAdd: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired,
  comparisons: React.PropTypes.array.isRequired
}

export default AddCompare
