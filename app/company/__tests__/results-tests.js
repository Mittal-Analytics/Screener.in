'use strict'
jest.disableAutomock()
import React from 'react'
import ReactDOM from 'react-dom'
import Results from '../results.jsx'
import TestUtils from 'react-addons-test-utils'


var NUMBERS = [
  ["Sales",{"2008-03-31":1033.36,"2009-03-31":1002.53}],
  ["Expenses",{"2008-03-31":915.16,"2009-03-31":1136.98}],
  ["Material Cost %",{"2008-03-31":11.16,"2009-03-31":11.98}],
  ["Operating Profit",{"2008-03-31":118.2,"2009-03-31":-134.45}],
  ["OPM",{"2008-03-31":11.44,"2009-03-31":-13.41}]
]


describe('Basic rendering Tests', function() {
  var result

  beforeEach(function() {
    var company = {
      cid: 33,
      warehouse_set: {
        result_type: 'sa',
        pair_url: ''
      },
      number_set: {
        quarters: [["Sales", {}]],
        annual: NUMBERS
      }
    }
    result = TestUtils.renderIntoDocument(
      <Results company={company} report="annual" />
    )
  })

  it('should treat Material Cost % as %', function() {
    var dom = ReactDOM.findDOMNode(result)
    var normalRow = '<tr class="odd"><td class="text">Sales'
    var percentRow = '<tr class="percent odd"><td class="text">Material Cost %'
    expect(dom.innerHTML).toContain(normalRow)
    expect(dom.innerHTML).toContain(percentRow)
  })
})
