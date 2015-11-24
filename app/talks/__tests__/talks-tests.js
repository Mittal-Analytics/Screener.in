'use strict';
/* global jest, require */
jest.dontMock('../talks.jsx');

var results = [
  {
    url: '/foo/', title: 'Foo is Barring', id: 1, short_url: 'foo', user: 2
  }
];

describe('talks Tests', function() {
  var talks, TestUtils, dummy, Api;

  beforeEach(function() {
    var React = require('react');
    Api = require('../../api.js');
    var Talks = require('../talks.jsx');
    TestUtils = require('react-addons-test-utils');
    dummy = jest.genMockFunction();
    var params = {};
    var location = {query: {}};
    window.loggedIn = true;
    window.userId = 32;
    talks = TestUtils.renderIntoDocument(
      <Talks params={params} location={location} />
    );
    var req = {
      url: ['talks'],
      load: {tab: 'top', page: 1}
    };
    Api.__setResponse(req, {results: results});
    Api.__setResponse(['talks', 'voted'], []);
  });

  afterEach(function() {
    expect(Api.__getPending()).toEqual([]);
  });

  it('should load talks', function() {
    jest.runAllTimers();
    expect(talks.state.talks.results).toEqual(results);
  });

  it('should fetch new talks', function() {
    jest.runAllTimers();
    var newProps = {
      params: {tab: 'latest'},
      location: {query: {}},
    };
    talks.componentWillReceiveProps(newProps);
    var newReq = {
      url: ['talks'],
      load: {tab: 'latest', page: 1}
    };
    Api.__setResponse(newReq, {results: []});
    jest.runAllTimers();
    expect(talks.state.talks.results).toEqual([]);
  });

  it('should show the top tab', function() {
    jest.runAllTimers();
    var latest = TestUtils.scryRenderedDOMComponentsWithTag(talks, 'a')[0];
    expect(latest.textContent).toEqual('Goto Latest Links');
  });

});
