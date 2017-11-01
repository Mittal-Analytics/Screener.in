'use strict';
jest.mock('fetch-on-rest');
jest.useFakeTimers()
import api from '../../api.js'
import React from 'react'
import RatioSearch from '../ratio.search.jsx'
import TestUtils from 'react-addons-test-utils'


describe('Ratio Search Tests', function() {
  var search, dummy;

  beforeEach(function() {
    dummy = jest.genMockFunction();
    window.loggedIn = true;
    search = TestUtils.renderIntoDocument(
      <RatioSearch onSelect={dummy} />
    );
  });

  afterEach(function() {
    expect(api.getPending()).toEqual([]);
  });

  it('should show login required', function() {
    window.loggedIn = false;
    search = TestUtils.renderIntoDocument(
      <RatioSearch onSelect={dummy} />
    );
    search.onChange('foo');
    var divs = TestUtils.findRenderedDOMComponentWithClass(
      search, 'alert'
    );
    expect(divs.textContent).toEqual('Please login to use this feature.');
  });

  it('should trigger select', function() {
    var input = TestUtils.findRenderedDOMComponentWithTag(
      search, 'input'
    );
    var ratio = {name: 'Patanjali', id: 7, url: '/ramdev/'};
    api.setResponse('/api/ratios/search/?q=Patanjali',
      JSON.stringify([ratio]));
    input.value = 'Patanjali';
    TestUtils.Simulate.change(input, {target: {value: 'Patanjali'}});
    jest.runAllTimers(); // debounce;
    return search.req.then(() => {
      TestUtils.Simulate.keyDown(input, {key: "Enter", keyCode: 13, which: 13});
      expect(dummy).toBeCalledWith(ratio);
    })
  });
});
