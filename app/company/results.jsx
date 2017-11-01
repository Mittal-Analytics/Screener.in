"use strict"
import React from 'react'
import Api from '../api.js'
import {Link} from 'react-router'
import classNames from 'classnames'
import endsWith from 'lodash/endsWith'
import defaults from 'lodash/defaults'
import {toLocalNumber, toMonthYear} from '../components/utils.js'


function getCaption(report) {
  if(report == 'quarters')
    return 'Quarterly Results'
  if(report == 'annual')
    return 'Annual Results'
  if(report == 'balancesheet')
    return 'Balance Sheet'
  if(report == 'cashflow')
    return 'Cash Flow'
}


function getPrefix(pair_url, standalone) {
  if(pair_url === null)
    return ''
  return standalone ? 'Standalone ': 'Consolidated '
}

function getSuffix(pair_url, standalone, prime) {
  if(pair_url === null)
    return ''
  var suffix = standalone ? 'View Consolidated' : 'View Standalone'
  var bprime = (prime == 'sa')
  if(bprime != standalone)
    suffix = <b>{suffix}</b>
  return <span> / <Link to={pair_url}>{suffix}</Link></span>
}

function getFieldNumbers(numbers, field) {
  for (var i = 0; i < numbers.length; i++) {
    var row = numbers[i]
    if(row[0] == field)
      return row
  }
  return [field, {}]
}

function getTrailing(report, number_set, ann_dates) {
  if(report != 'annual')
    return
  var last_ann = ann_dates[ann_dates.length -1]
  var quarters = number_set.quarters
  var qtr_dates = Object.keys(quarters[0][1]).sort()
  var last_qtr = qtr_dates[qtr_dates.length - 1]
  if(qtr_dates.length < 4 || last_qtr <= last_ann)
    return

  var four_qtrs = qtr_dates.slice(-4)
  var trailing = {}
  for(var i=0; i < quarters.length; i++) {
    var field = quarters[i][0]
    var vals = quarters[i][1]
    var value = 0
    for(var j=0; j < four_qtrs.length; j++) {
      value += vals[four_qtrs[j]]
    }
    var final_val = ttmAverages.indexOf(field) >= 0 ? value / four_qtrs.length : value
    trailing[field] = final_val.toFixed(2)
  }
  return trailing
}

var highlights = [
  'Operating Profit', 'Profit before tax', 'Net Profit',
  'Total Liabilities', 'Total Assets',
  'Net Cash Flow'
]
var compareHighlights = [
  'OPM', 'Profit before tax', 'Net Profit',
  'Debt / Equity', 'ROCE %',
  'Debtor Days', 'Net Cash Flow'
]
var ttmAverages = ['OPM', 'Tax %']
var percents = ['OPM', 'Dividend Payout']


class Results extends React.Component {
  updateClassVariables(props) {
    this.company = props.company
    this.isComparison = props.comparisons && props.comparisons.length > 0
    this.isMulti = props.comparisons && props.comparisons.length > 1
    var primary = this.isComparison ? props.comparisons[0] : this.company
    this.numbers = primary.number_set[props.report]
    this.dates = Object.keys(this.numbers[0][1]).sort()
    this.trailing = !this.isComparison && getTrailing(
      props.report, primary.number_set, this.dates
    )
  }

  constructor(props, context) {
    super(props, context)
    this.updateClassVariables(props)
    this.state = {schedules: {}}
  }

  componentWillReceiveProps(props) {
    this.updateClassVariables(props)
    this.setState({schedules: {}})
  }

  handleExpand(field) {
    if(this.state.schedules[field])
      return
    var cid = this.props.company.id
    var params = {
      id: cid,
      r: this.props.company.warehouse_set.result_type,
      f: this.props.report,
      q: field
    }
    this._req = Api.get(Api.cid(cid, 'schedules'), params)
      .then(response => {
        if (response.length === 0)
          return
        var schedules = defaults({}, this.state.schedules)
        schedules[field] = response
        this.setState({schedules: schedules})
      })
  }

  renderSchedules(field, company, momClass) {
    var schedules = this.state.schedules[field]
    if(!schedules)
      return
    return schedules.map(
      this.renderRow.bind(this, company, ['child', momClass])
    )
  }

  renderComparisons(field, momClass) {
    if(!this.isMulti)
      return
    var comparisons = this.props.comparisons
    return comparisons.map((compared, idx) => {
      if (idx == 0)
        return
      var row = getFieldNumbers(compared.number_set[this.props.report], field)
      return this.renderRow(compared, ['compared', momClass], row, idx)
    })
  }

  renderRow(company, classes, row, idx) {
    var field = row[0]
    var oddEvenClass = idx % 2 == 0 ? 'odd' : 'even'
    var isPrimary = company.id == this.company.id
    var strongs = this.isComparison ? compareHighlights : highlights
    var rowClass = classNames(classes || oddEvenClass, {
      'mom': field in this.state.schedules,
      'strong': strongs.indexOf(field) >= 0,
      'percent': percents.indexOf(field) >= 0 || endsWith(field, '%')
    })

    var fieldCell = isPrimary ? <td
      className="text"
      onClick={() => this.handleExpand(field)}>
        {row[0]}
    </td> : <td className="text" />
    var companyNameCell = this.isMulti && <td className="text">
      {company.short_name}
    </td>
    var dataCells = this.dates.map(function(date, iidx) {
      return <td key={iidx}>
        {toLocalNumber(row[1][date])}
      </td>
    })
    var ttmCell = this.trailing && <td>{this.trailing[field]}</td>

    return [
      <tr className={rowClass} key={idx}>
        {fieldCell}
        {companyNameCell}
        {dataCells}
        {ttmCell}
      </tr>,
      isPrimary && this.renderComparisons(field, oddEvenClass),
      this.renderSchedules(field, company, oddEvenClass)
    ]
  }

  render() {
    var company = this.company
    var standalone = company.warehouse_set.result_type == 'sa'
    var pair_url = company.warehouse_set.pair_url
    var pair_link = getSuffix(pair_url, standalone, company.prime)
    var compareHead = this.isMulti && <th />
    var dateHeads = this.dates.map(function(resultDate, idx) {
      return <th key={idx}>{toMonthYear(resultDate)}</th>
    })
    var ttmHead = this.trailing && <th>TTM</th>
    return <div>
      <h2>{getCaption(this.props.report)}
        <small> {getPrefix(pair_url, standalone)}
          Figures in Rs. Crores {pair_link}
        </small>
      </h2>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th />
              {compareHead}
              {dateHeads}
              {ttmHead}
            </tr>
          </thead>
          <tbody>
            {this.numbers.map(this.renderRow.bind(this, this.company, false))}
          </tbody>
        </table>
      </div>
    </div>
  }
}

Results.propTypes = {
  company: React.PropTypes.object.isRequired,
  comparisons: React.PropTypes.array,
  report: React.PropTypes.string.isRequired
}

export default Results
