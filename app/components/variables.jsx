"use strict";
import React from 'react'
import Button from 'app/components/button.jsx'

function Variables(props) {
  function insertVariable(name) {
    return props.insertThis(name, "")
  }
  var systemRatios = props.ratios.system_ratios
  var userRatios = props.ratios.user_ratios
  var categories = [
    "Annual Results",
    "Balance Sheet",
    "Cash Flow Statement",
    "Quarterly Results",
    "Valuation",
    "Ratios"
  ]
  var variables = {
    "Rs.Cr.": [],
    "Rs.": [],
    "Cr.": [],
    "%": [],
    "": []
  }
  for (var i = 0; i < systemRatios.length; i++) {
    var unit = systemRatios[i][0]
    var category = systemRatios[i][3]
    if ("Annual Results" != category)
      continue
    variables[unit].push(systemRatios[i])
  }
  return <div>
    <div>
      Categories
      {categories.map((category, idx) => {
        return <Button
          style="primary"
          icon="pencil"
          onClick={insertVariable.bind(null, 'Pending')}
          name={category}
          key={idx}
        />
      })}
    </div>
    <div>
      Variables
      {variables["Rs.Cr."].map((variable, idx) => {
        return <Button
          key={idx}
          style="default"
          onClick={insertVariable.bind(null, variable[1])}
          name={variable[1]}
        />

      })}
    </div>
  </div>
}

Variables.propTypes = {
  insertThis: React.PropTypes.func.isRequired,
  ratios: React.PropTypes.object.isRequired
}

module.exports = Variables
