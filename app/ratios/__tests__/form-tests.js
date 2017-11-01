'use strict'
jest.useFakeTimers()
jest.mock('fetch-on-rest')
import api from '../../api.js'
import React from 'react'
import RatioForm from '../form.jsx'
import TestUtils from 'react-addons-test-utils'

var PREVIEW = [{"preview": 100.1, "short_name": "Reliance Inds."},
               {"preview": 50.76, "short_name": "TCS"}]
var EVENT = {
  preventDefault: jest.genMockFunction()
}

describe('Form Tests for creation', function() {
  var form

  beforeEach(function() {
    var formHTML = '<input name="name">'
    form = TestUtils.renderIntoDocument(
      <RatioForm formHTML={{__html: formHTML}} />
    )
  })

  afterEach(function() {
    expect(api.getPending()).toEqual([])
  })

  it('should show preview', function() {
    expect(form.state.isPreview).toEqual(false)
    api.setResponse('/api/ratios/preview/', '[]')
    return form.handleSubmit(EVENT).then(() => {
      expect(form.state.errors).toEqual(false)
      expect(form.state.isPreview).toEqual([])
    })
  })

  it('should create new ratio', function() {
    form.setState({isPreview: PREVIEW})
    jest.runAllTimers()
    api.setResponse('/api/ratios/', '[]')
    return form.handleSubmit(EVENT).then(
      () => expect(form.state.isPreview).toBeTruthy()
    )
  })
})


describe('Form Tests for updation', function() {
  var form

  beforeEach(function() {
    var formHTML = '<input name="name">'
    form = TestUtils.renderIntoDocument(
      <RatioForm
        formHTML={{__html: formHTML}}
        ratioId={33}
        formula="Book Value * 22"
      />
    )
  })

  afterEach(function() {
    expect(api.getPending()).toEqual([])
  })

  it('should show preview', function() {
    api.setResponse('/api/ratios/preview/', '[]')
    return form.handleSubmit(EVENT).then(() => {
      expect(form.state.isPreview).toEqual([])
    })
  })

  it('should update existing ratio', function() {
    form.setState({isPreview: PREVIEW})
    jest.runAllTimers()
    api.setResponse('/api/ratios/33/', '[]')
    return form.handleSubmit(EVENT).then(
      () => expect(form.state.isPreview).toBeTruthy()
    )
  })
})
