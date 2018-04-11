'use strict';
jest.disableAutomock();
jest.mock('fetch-on-rest');
import TestUtils from 'react-addons-test-utils'
import React from 'react'
import SaveScreenModal from '../savescreen.modal.jsx'
import api from '../../api.js'

var SCREEN = {
  query: '1=1',
  ratios: [[
    "Current price",
    "CMP",
    "Rs."
  ]],
  results: [
    ['/foo/', 'Foo', 115]
  ]
}


describe('SaveScreen Modal tests', function() {
  beforeEach(function() {
    window.loggedIn = true;
  });

  afterEach(function() {
    expect(api.getPending()).toEqual([]);
  });

  it('should POST on form submit', function() {
    var modal = TestUtils.renderIntoDocument(
      <SaveScreenModal screen={SCREEN} update={undefined} />
    )
    var button = TestUtils.findRenderedDOMComponentWithTag(
      modal, 'button')
    TestUtils.Simulate.click(button)
    var form = TestUtils.findRenderedDOMComponentWithTag(
      modal, 'form'
    );
    var html = '<input name="query" class="form-control" type="hidden">'
    api.setResponse('/api/screens.html', html);
    TestUtils.Simulate.submit(form);
    return modal._req.then(() => {
      expect(window.fetch).toBeCalledWith('/api/screens/', {
        body: '{"csrfmiddlewaretoken":"","":"","query":"1=1"}',
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': ''
        },
        method: 'post'
      });
    });
  })

  it('should PUT on form submit', function() {
    var modal = TestUtils.renderIntoDocument(
      <SaveScreenModal screen={SCREEN} update="2" />
    )
    var button = TestUtils.findRenderedDOMComponentWithTag(
      modal, 'button')
    TestUtils.Simulate.click(button)
    var html = '<input name="query" class="form-control" type="hidden">'
    api.setResponse('/api/screens/2.html', html);
    var form = TestUtils.findRenderedDOMComponentWithTag(
      modal, 'form'
    );
    TestUtils.Simulate.submit(form);
    return modal._req.then(() => {
      expect(window.fetch).toBeCalledWith('/api/screens/2/', {
        body: '{"csrfmiddlewaretoken":"","":"","query":"1=1"}',
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': ''
        },
        method: 'put'
      });
    });
  })

});
