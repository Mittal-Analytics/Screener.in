'use strict';
/* global jest, require */
jest.dontMock('../ratio.search.jsx');

describe('Ratio Search Tests', function() {
  var RatioSearch, search, TestUtils, dummy, Api;

  beforeEach(function() {
    var React = require('react');
    Api = require('../../api.js');
    RatioSearch = require('../ratio.search.jsx');
    TestUtils = require('react-addons-test-utils');
    dummy = jest.genMockFunction();
    window.loggedIn = true;
    search = TestUtils.renderIntoDocument(
      <RatioSearch onSelect={dummy} />
    );
  });

  afterEach(function() {
    expect(Api.__getPending()).toEqual([]);
  });

  it('should show login required', function() {
    var React = require('react');
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
    var req = {
      url: Api.ratioSearch,
      load: {q: 'Patanjali'}
    };
    Api.__setResponse(req, [ratio]);
    input.value = 'Patanjali';
    TestUtils.Simulate.change(input, {target: {value: 'Patanjali'}});
    jest.runAllTimers();
    TestUtils.Simulate.keyDown(input, {key: "Enter", keyCode: 13, which: 13});
    expect(dummy).toBeCalledWith(ratio);
  });

});
