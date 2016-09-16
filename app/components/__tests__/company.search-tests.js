'use strict';
jest.mock('fetch-on-rest');
jest.useFakeTimers()
var api = require('../../api.js');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var CompanySearch = require('../company.search.jsx');

describe('Company Search Tests', function() {
  var search, dummy;

  beforeEach(function() {
    dummy = jest.genMockFunction();
    search = TestUtils.renderIntoDocument(
      <CompanySearch onSelect={dummy} />
    );
  });

  afterEach(function() {
    expect(api.getPending()).toEqual([]);
  });

  it('should trigger select', function() {
    var company = {name: 'Patanjali', id: 7, url: '/ramdev/'};
    api.setResponse('/api/company/search/?q=Patanjali', JSON.stringify([company]));
    var input = TestUtils.findRenderedDOMComponentWithTag(
      search, 'input'
    );
    input.value = 'Patanjali';
    TestUtils.Simulate.change(input, {target: {value: 'Patanjali'}});
    jest.runAllTimers(); // for debounce
    return search.req.then(() => {
      expect(window.fetch).toBeCalled();
      expect(window.fetch.mock.calls[0][0]).toBe('/api/company/search/?q=Patanjali')
      TestUtils.Simulate.keyDown(input, {key: "Enter", keyCode: 13, which: 13});
      expect(dummy).toBeCalled();
      expect(dummy).toBeCalledWith(company);
    })
  });

});
