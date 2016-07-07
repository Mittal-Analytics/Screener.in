'use strict'
jest.disableAutomock()
import React from 'react'
import ReactDOM from 'react-dom'
import Results from '../results.jsx'
import TestUtils from 'react-addons-test-utils'


var NUMBERS = [
  ["Sales",{"2008-03-31":1033.36,"2009-03-31":1002.53}],
  ["Expenses",{"2008-03-31":915.16,"2009-03-31":1136.98}],
  ["Material Cost %",{"2008-03-31":11.26,"2009-03-31":11.38}],
  ["Manufacturing Cost %",{"2008-03-31":8.64,"2009-03-31":8.43}],
  ["Employee Cost %",{"2008-03-31":91.23,"2009-03-31":98.93}],
  ["Other Cost %",{"2008-03-31":2.61,"2009-03-31":3.41}],
  ["Operating Profit",{"2008-03-31":118.2,"2009-03-31":-134.45}],
  ["OPM",{"2008-03-31":11.44,"2009-03-31":-13.41}]
]


var COMPARENUMBERS = [
  ["Sales",{"2008-03-31":533.36,"2009-03-31":502.53}],
  ["Expenses",{"2008-03-31":415.16,"2009-03-31":536.98}],
  ["Material Cost %",{"2008-03-31":5.26,"2009-03-31":5.38}],
  ["Manufacturing Cost %",{"2008-03-31":4.64,"2009-03-31":4.43}],
  ["Employee Cost %",{"2008-03-31":71.23,"2009-03-31":78.93}],
  ["Other Cost %",{"2008-03-31":2.21,"2009-03-31":3.11}],
  ["Operating Profit",{"2008-03-31":58.2,"2009-03-31":-74.45}],
  ["OPM",{"2008-03-31":9.44,"2009-03-31":-11.41}]
]

describe('Basic rendering Tests', function() {
  var result
  var company // https://www.screener.in/api/company/512573/
  var compareCompany // https://www.screener.in/api/company/539168/

  beforeEach(function() {
    company = {
      id: 341,
      warehouse_set: {
        result_type: 'sa',
        pair_url: ''
      },
      number_set: {
        quarters: [["Sales", {}]],
        annual: NUMBERS
      },
      bse_code: "512573",
      short_name: "Avanti Feeds",
      name: "Avanti Feeds Ltd"
    };
    compareCompany = {
      id: 1270856,
      warehouse_set: {
        result_type: 'sa',
        pair_url: ''
      },
      number_set: {
        quarters: [["Sales", {}]],
        annual: COMPARENUMBERS
      },
      bse_code: "539168",
      short_name: "Spisys",
      name: "Spisys Ltd"
    };
  })

  it('Company results without comparing another company', function() {
    result = TestUtils.renderIntoDocument(
      <Results company={company} report="annual" />
    )
    var dom = ReactDOM.findDOMNode(result)
    var salesRow = '<tr class="odd"><td class="text">Sales</td><td>1,033.36</td>'
    var materialRow = '<tr class="odd percent"><td class="text">Material Cost %</td><td>11.26</td>'
    var normalComparisonRow = 'Spisys'
    expect(dom.innerHTML).toContain(salesRow)
    expect(dom.innerHTML).toContain(materialRow)
    expect(dom.innerHTML).not.toContain(normalComparisonRow)
  })

  it('Company results comparing with another company', function() {
    result = TestUtils.renderIntoDocument(
      <Results company={company} report="annual" compareCompany={compareCompany} />
    )
    var dom = ReactDOM.findDOMNode(result)
    var salesRow = '<tr class="odd"><td class="text">Sales</td><td class="text">Avanti Feeds</td><td>1,033.36</td>'
    var materialRow = '<tr class="odd percent"><td class="text">Material Cost %</td><td class="text">Avanti Feeds</td><td>11.26</td>'
    var salesComparisonRow = '<tr class="compared odd"><td></td><td class="text">Spisys</td><td>533.36</td>'
    expect(dom.innerHTML).toContain(salesRow)
    expect(dom.innerHTML).toContain(materialRow)
    expect(dom.innerHTML).toContain(salesComparisonRow)
  })
})
