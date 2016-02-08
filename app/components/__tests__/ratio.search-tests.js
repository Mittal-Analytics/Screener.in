'use strict';
jest.autoMockOff();
jest.mock('fetch-on-rest');


describe('Ratio Search Tests', function() {
  var api = require('app/api.js');
  var RatioSearch, search, TestUtils, dummy, React;

  beforeEach(function() {
    React = require('react');
    RatioSearch = require('../ratio.search.jsx');
    TestUtils = require('react-addons-test-utils');
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

  pit('should trigger select', function() {
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
