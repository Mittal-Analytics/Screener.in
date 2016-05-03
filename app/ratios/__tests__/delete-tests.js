'use strict'
jest.autoMockOff()
jest.mock('fetch-on-rest')

var DEPENDENTS = {
  "screens":[],
  "ratios":[
    {"id":4265,"formula":"Average return on capital employed 5Years / 5 Year PE ","ratio_unit":"%","ratio_name":"Earnings Yield x ROCE","short_name":"ROCE / PE (5yrs)","description":"Foo"}
  ]
}

describe('Ratio Delete Unit Tests', function() {
  var api = require('app/api.js')
  var confirm

  beforeEach(function() {
    var React = require('react')
    var RatioDelete = require('../delete.jsx')
    var TestUtils = require('react-addons-test-utils')

    api.setResponse('/api/ratios/33/', JSON.stringify(DEPENDENTS))
    confirm = TestUtils.renderIntoDocument(
      <RatioDelete params={{ratioId: "33"}} />
    )
  })

  afterEach(function() {
    expect(api.getPending()).toEqual([])
  })

  pit('should confirm delete', function() {
    return confirm._req.then(() => {
      expect(confirm.state.dependents).toEqual(DEPENDENTS)
      api.setResponse('/api/ratios/33/?confirm=true', '[]')
      return confirm.handleSubmit()
    })
  })
})
