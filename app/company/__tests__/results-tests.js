'use strict'
jest.disableAutomock()
jest.mock('fetch-on-rest')
import api from '../../api.js'
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

var SCHEDULE = [
  ["Schedule A",{"2008-03-31":77.27,"2009-03-31":75.49}],
  ["Schedule B",{"2008-03-31":77.27,"2009-03-31":75.49}]
]

var FooCompany = {
  id: 33,
  short_name: 'Foo',
  warehouse_set: {
    result_type: 'sa',
    pair_url: ''
  },
  number_set: {
    quarters: [["Sales", {}]],
    annual: NUMBERS
  }
}

var BarCompany = {
  id: 55,
  short_name: 'Bar',
  warehouse_set: {
    result_type: 'sa',
    pair_url: ''
  },
  number_set: {
    quarters: [["Sales", {}]],
    annual: NUMBERS
  }
}

describe('Basic rendering Tests', function() {
  var result

  beforeEach(function() {
    result = TestUtils.renderIntoDocument(
      <Results company={FooCompany} report="annual" />
    )
  })

  afterEach(function() {
    expect(api.getPending()).toEqual([])
  })

  it('should expand schedules', function() {
    var dom = ReactDOM.findDOMNode(result)
    var row = dom.getElementsByTagName('tr')[1]
    var field = row.getElementsByTagName('td')[0]
    expect(dom.innerHTML).not.toContain('Schedule A')
    api.setResponse('/api/company/33/schedules/?id=33&r=sa&f=annual&q=Sales', JSON.stringify(SCHEDULE))
    TestUtils.Simulate.click(field)
    return result._req.then(() => {
      expect(dom.innerHTML).toContain('Schedule A')
    })
  })

  it('should treat Material Cost % as %', function() {
    var dom = ReactDOM.findDOMNode(result)
    var normalRow = '<tr class="odd"><td class="text">Sales'
    var percentRow = '<tr class="odd percent"><td class="text">Material Cost %'
    expect(dom.innerHTML).toContain(normalRow)
    expect(dom.innerHTML).toContain(percentRow)
  })
})


describe('Comparison rendering Tests', function() {
  var result

  beforeEach(function() {
    result = TestUtils.renderIntoDocument(
      <Results
        company={FooCompany}
        report="annual"
        comparisons={[FooCompany, BarCompany]}
      />
    )
  })

  afterEach(function() {
    expect(api.getPending()).toEqual([])
  })

  it('should add comparison row', function() {
    var dom = ReactDOM.findDOMNode(result)
    var salesFoo = '<tr class="odd"><td class="text">Sales</td><td class="text">Foo</td><td>1,033.36</td>'
    var salesBar = '<tr class="compared odd"><td class="text"></td><td class="text">Bar</td><td>1,033.36</td>'
    expect(dom.innerHTML).toContain(salesFoo)
    expect(dom.innerHTML).toContain(salesBar)
  })
})
