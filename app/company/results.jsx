"use strict";
import React from 'react'
import Api from 'app/api.js'
import {Link} from 'react-router'
import classNames from 'classnames'
import Utils from 'app/components/utils.js'
import defaults from 'lodash/defaults'


function getCaption(report) {
  if(report == 'quarters')
    return 'Quarterly Results';
  if(report == 'annual')
    return 'Annual Results';
  if(report == 'balancesheet')
    return 'Balance Sheet';
  if(report == 'cashflow')
    return 'Cash Flow';
}


function getPrefix(pair_url, standalone) {
  if(pair_url === null)
    return '';
  return standalone ? 'Standalone ': 'Consolidated ';
}

function getSuffix(pair_url, standalone, prime) {
  if(pair_url === null)
    return '';
  var suffix = standalone ? 'View Consolidated' : 'View Standalone';
  var bprime = (prime == 'sa');
  if(bprime != standalone)
    suffix = <b>{suffix}</b>;
  return <span> / <Link to={pair_url}>{suffix}</Link></span>;
}

function getTrailing(report, number_set, ann_dates) {
  if(report != 'annual')
    return;
  var last_ann = ann_dates[ann_dates.length -1];
  var quarters = number_set.quarters;
  var qtr_dates = Object.keys(quarters[0][1]).sort();
  var last_qtr = qtr_dates[qtr_dates.length - 1];
  if(qtr_dates.length < 4 || last_qtr <= last_ann)
    return;

  var four_qtrs = qtr_dates.slice(-4);
  var trailing = {};
  for(var i=0; i < quarters.length; i++) {
    var field = quarters[i][0];
    var vals = quarters[i][1];
    var value = 0;
    for(var j=0; j < four_qtrs.length; j++) {
      value += vals[four_qtrs[j]];
    }
    var final_val = field == 'OPM' ? value / four_qtrs.length : value;
    trailing[field] = final_val.toFixed(2);
  }
  return trailing;
}

var highlights = [
  'Operating Profit', 'Profit before tax', 'Net Profit',
  'Total Liabilities', 'Total Assets',
  'Net Cash Flow'
];

var percentsAll = ['Sales', 'Expenses', 'Operating Profit', 'OPM', 'Other Income', 'Interest', 'Depreciation', 'Profit before tax', 'Tax', 'Net Profit', 'EPS (unadj)', 'Dividend Payout'];
var percentsMin = ['OPM', 'Dividend Payout'];
var percents = percentsMin;


class Results extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      showInPercent : false,
      schedules: {}
    }
  }

  componentWillReceiveProps() {
    this.setState({
      schedules: {}
    })
  }

  handleExpand(field) {
    if(this.state.schedules[field])
      return;
    var cid = this.props.company.id;
    var params = {
      id: cid,
      r: this.props.company.warehouse_set.result_type,
      f: this.props.report,
      q: field
    };
    Api.get(Api.cid(cid, 'schedules'), params)
      .then(function(response) {
        if (response.length === 0)
          return;
        var schedules = defaults({}, this.state.schedules);
        schedules[field] = response;
        this.setState({schedules: schedules});
      }.bind(this));
  }

  normalizeTrailing(trailingNumbers) {
    var salesValue = trailingNumbers['Sales'];
    var copyTrailing = {};

    for (var key in trailingNumbers) {
      if (key == 'Sales' || key == 'OPM' || key == 'Dividend Payout') {
        copyTrailing[key] = trailingNumbers[key];
        continue;
      }
      copyTrailing[key] = trailingNumbers[key] * 100.0 / salesValue;
      copyTrailing[key] = copyTrailing[key].toFixed(2)
    }

    copyTrailing['Sales'] = 100;

    return copyTrailing;
  }

  normalizeNumbers(numbers) {
    var newAnnualNumbers = [];
    var salesIndx = 0; // Will be always so

    for (var indx = 0; indx < numbers.length; indx++) {
      newAnnualNumbers[indx] = [];
      newAnnualNumbers[indx][0] = numbers[indx][0];
      var keyName = numbers[indx][0];
      newAnnualNumbers[indx][1] = {};
      for (var date in numbers[indx][1]) {
        newAnnualNumbers[indx][1][date] = numbers[indx][1][date];

        if (keyName == 'OPM' || keyName == 'Dividend Payout') {
          // No modifications
        } else if (keyName == 'Sales') {
          newAnnualNumbers[indx][1][date] = 100;
        } else {
          newAnnualNumbers[indx][1][date] = newAnnualNumbers[indx][1][date] * 100.0 / numbers[salesIndx][1][date];
          newAnnualNumbers[indx][1][date] = newAnnualNumbers[indx][1][date].toFixed(2);
        }
      }
    }

    return newAnnualNumbers;
  }

  renderRow(trailing, dates, childIdx, row, idx) {
    var field = row[0];
    var schedules = this.state.schedules[field];
    var rowClass = classNames({
      'mom': schedules,
      'child': childIdx !== false,
      'strong': highlights.indexOf(field) >= 0,
      'percent': percents.indexOf(field) >= 0,
      'odd': ( childIdx === false ? idx : childIdx ) % 2 == 0
    });
    var Cells = dates.map(function(rdt, iidx) {
      return <td key={iidx}>{Utils.toLocalNumber(row[1][rdt])}</td>;
    });
    var TTMCell = trailing ? <td>{trailing[field]}</td> : false;
    return [<tr className={rowClass} key={idx}>
      <td className="text" onClick={this.handleExpand.bind(null, field)}>
        {row[0]}
      </td>
      {Cells}
      {TTMCell}
    </tr>, schedules && schedules.map(this.renderRow.bind(this, trailing, dates, idx))];
  }

  render() {
    var company = this.props.company;
    percents = percentsMin;
    var standalone = company.warehouse_set.result_type == 'sa';
    var pair_url = company.warehouse_set.pair_url;
    var pair_link = getSuffix(pair_url, standalone, company.prime);
    var numbers = company.number_set[this.props.report];
    var dates = Object.keys(numbers[0][1]).sort();
    var trailing = getTrailing(this.props.report, company.number_set, dates);
    var figuresIn = 'Rs. Crores';

    if (this.props.report == 'annual' && this.state.showInPercent) {
      numbers = this.normalizeNumbers(numbers);
      trailing = this.normalizeTrailing(trailing);
      percents = percentsAll;
      figuresIn = 'Percentage of Sales';
    }

    var Heads = dates.map(function(rdt, idx) {
      return <th key={idx}>{Utils.toMonthYear(rdt)}</th>;
    });
    var TTMHead = trailing && <th>TTM</th>;

    return <div>
      <a
        className="pull-right btn btn-default"
        onClick={() => this.setState({showInPercent: !this.state.showInPercent})}
      >Toggle %age</a>

      <h2>{getCaption(this.props.report)}
        <small> {getPrefix(pair_url, standalone)}
          Figures in {figuresIn} {pair_link}
        </small>
      </h2>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th />
              {Heads}
              {TTMHead}
            </tr>
          </thead>
          <tbody>
            {numbers.map(this.renderRow.bind(this, trailing, dates, false))}
          </tbody>
        </table>
      </div>
    </div>;
  }
}

Results.propTypes = {
  company: React.PropTypes.object.isRequired,
  report: React.PropTypes.string.isRequired
}


module.exports = Results
