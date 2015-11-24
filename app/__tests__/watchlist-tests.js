'use strict';
/* global jest, require */
jest.dontMock('../watchlist.jsx');

var screen = {
  ratios: [[
    "Current price",
    "CMP",
    "Rs."
  ]],
  results: []
};

describe('watchlist Tests', function() {
  var watchlist, TestUtils, dummy, Api;

  beforeEach(function() {
    var React = require('react');
    Api = require('../api.js');
    var Watchlist = require('../watchlist.jsx');
    window.loggedIn = true;
    TestUtils = require('react-addons-test-utils');
    dummy = jest.genMockFunction();
    var params = {
      search: '',
      query: {},
      pathname: '/watchlist/'
    };
    watchlist = TestUtils.renderIntoDocument(
      <Watchlist location={params}/>
    );
  });

  afterEach(function() {
    expect(Api.__getPending()).toEqual([]);
  });

  it('should show loading', function() {
    var ReactDOM = require('react-dom');
    var dom = ReactDOM.findDOMNode(watchlist);
    expect(dom.textContent).toEqual('Loading...');
  });

  it('should load watchlist', function() {
    var req = {
      url: '/api/users/watchlist/',
      load: ''
    };
    Api.__setResponse(req, screen);
    jest.runAllTimers();
    expect(watchlist.state.screen.results).toEqual([]);
    var table = TestUtils.findRenderedDOMComponentWithTag(
      watchlist, 'table');
    expect(table).toBeDefined();
  });

});
