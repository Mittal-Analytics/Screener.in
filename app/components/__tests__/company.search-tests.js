'use strict';
/* global jest, require */
jest.dontMock('../company.search.jsx');

describe('Company Search Tests', function() {
  var search, TestUtils, dummy, Api;

  beforeEach(function() {
    var React = require('react');
    Api = require('../../api.js');
    var CompanySearch = require('../company.search.jsx');
    TestUtils = require('react-addons-test-utils');
    dummy = jest.genMockFunction();
    search = TestUtils.renderIntoDocument(
      <CompanySearch onSelect={dummy} />
    );
  });

  afterEach(function() {
    expect(Api.__getPending()).toEqual([]);
  });

  it('should trigger select', function() {
    var input = TestUtils.findRenderedDOMComponentWithTag(
      search, 'input'
    );
    var company = {name: 'Patanjali', id: 7, url: '/ramdev/'};
    var req = {
      url: ['company', 'search'],
      load: {q: 'Patanjali'}
    }
    Api.__setResponse(req, [company]);
    input.value = 'Patanjali';
    TestUtils.Simulate.change(input, {target: {value: 'Patanjali'}});
    jest.runAllTimers();
    TestUtils.Simulate.keyDown(input, {key: "Enter", keyCode: 13, which: 13});
    expect(dummy).toBeCalledWith(company);
  });

});
