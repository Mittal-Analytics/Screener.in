'use strict'
jest.disableAutomock()
jest.mock('fetch-on-rest')
import api from '../../api.js'
import React from 'react'
import RatioDelete from '../delete.jsx'
import TestUtils from 'react-addons-test-utils'


var DEPENDENTS = {
  "screens":[],
  "ratios":[
    {"id":4265,"formula":"Average return on capital employed 5Years / 5 Year PE ","ratio_unit":"%","ratio_name":"Earnings Yield x ROCE","short_name":"ROCE / PE (5yrs)","description":"Foo"}
  ]
}

describe('Ratio Delete Unit Tests', function() {
  var confirm

  beforeEach(function() {
    api.setResponse('/api/ratios/33/', JSON.stringify(DEPENDENTS))
    confirm = TestUtils.renderIntoDocument(
      <RatioDelete params={{ratioId: "33"}} />
    )
  })

  afterEach(function() {
    expect(api.getPending()).toEqual([])
  })

  it('should confirm delete', function() {
    return confirm._req.then(() => {
      expect(confirm.state.dependents).toEqual(DEPENDENTS)
      api.setResponse('/api/ratios/33/?confirm=true', '[]')
      return confirm.handleSubmit()
    })
  })
})
