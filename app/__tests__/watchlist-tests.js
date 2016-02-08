'use strict';
jest.autoMockOff();
jest.mock('fetch-on-rest');


var screen = {
  ratios: [[
    "Current price",
    "CMP",
    "Rs."
  ]],
  results: [
    ['/foo/', 'Foo', 115]
  ]
};

describe('watchlist Tests', function() {
  var api = require('app/api.js');
  var watchlist, TestUtils;

  beforeEach(function() {
    var React = require('react');
    var Watchlist = require('../watchlist.jsx');
    window.loggedIn = true;
    TestUtils = require('react-addons-test-utils');
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
    expect(api.getPending()).toEqual([]);
  });

  it('should show loading', function() {
    var ReactDOM = require('react-dom');
    var dom = ReactDOM.findDOMNode(watchlist);
    expect(dom.textContent).toEqual('Loading...');
  });

  pit('should load watchlist', function() {
    api.setResponse('/api/users/watchlist/',
      JSON.stringify(screen));
    return watchlist.componentDidMount().then(() => {
      expect(watchlist.state.screen).toEqual(screen);
      var table = TestUtils.findRenderedDOMComponentWithTag(
        watchlist, 'table');
      expect(table).toBeDefined();
    });
  });

});
