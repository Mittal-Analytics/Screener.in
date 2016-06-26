'use strict'
jest.autoMockOff()
jest.mock('fetch-on-rest')
var api = require('../../api.js')
var React = require('react')
var RatioEdit = require('../edit.jsx')
var TestUtils = require('react-addons-test-utils')


var FORMHTML = '<input name="name">'
var RATIO = {"id":33,"formula":"Current price / EPS latest quarter","ratio_unit":"","ratio_name":"Quarterly PE2","short_name":"PE Qtr2","description":"Wow"}

describe('Ratio Edit Unit Tests', function() {
  var form

  beforeEach(function() {
    api.setResponse('/api/ratios/33.html', FORMHTML)
    api.setResponse('/api/ratios/33/', JSON.stringify(RATIO))
    form = TestUtils.renderIntoDocument(
      <RatioEdit params={{ratioId: "33"}} />
    )
  })

  afterEach(function() {
    expect(api.getPending()).toEqual([])
  })

  it('should load form and ratio', function() {
    expect(form.state.formHTML).toEqual(false)
    return form._req.then(() => {
      expect(form.state.ratio).toEqual(RATIO)
      expect(form.state.formHTML.__html).toEqual(FORMHTML)
    })
  })
})
