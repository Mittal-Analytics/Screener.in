'use strict'
jest.dontMock('../results.jsx')

var NUMBERS = [
  ["Sales",{"2008-03-31":1033.36,"2009-03-31":1002.53}],
  ["Expenses",{"2008-03-31":915.16,"2009-03-31":1136.98}],
  ["Operating Profit",{"2008-03-31":118.2,"2009-03-31":-134.45}],
  ["OPM",{"2008-03-31":11.44,"2009-03-31":-13.41}]
]


describe('normalizeNumbers Tests', function() {
  var result

  beforeEach(function() {
    var React = require('react')
    var Results = require('../results.jsx')
    var TestUtils = require('react-addons-test-utils')
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

  it('should ensure that numbers are normaliized', function() {
    var normalized = result.normalizeNumbers(NUMBERS)
    var expected = [
      ["Sales",{"2008-03-31":100,"2009-03-31":100}],
      ["Expenses",{"2008-03-31":'88.56',"2009-03-31":'113.41'}],
      ["Operating Profit",{"2008-03-31":'11.44',"2009-03-31":'-13.41'}],
      ["OPM",{"2008-03-31":11.44,"2009-03-31":-13.41}]
    ]
    expect(normalized).toEqual(expected)
  })
})
