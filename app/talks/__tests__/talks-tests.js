'use strict';
jest.autoMockOff();
jest.mock('fetch-on-rest');

var results = [
  {
    url: '/foo/', title: 'Foo is Barring', id: 1, short_url: 'foo', user: 2
  }
];

describe('talks Tests', function() {
  var api = require('app/api.js');
  var talks, TestUtils;

  beforeEach(function() {
    var React = require('react');
    var Talks = require('../talks.jsx');
    TestUtils = require('react-addons-test-utils');
    var params = {};
    var location = {query: {}};
    window.loggedIn = true;
    window.userId = 32;
    talks = TestUtils.renderIntoDocument(
      <Talks params={params} location={location} />
    );
  });

  afterEach(function() {
    expect(api.getPending()).toEqual([]);
  });

  pit('should load talks', function() {
    api.setResponse('/api/talks/?tab=top&page=1',
      JSON.stringify({results: results}));
    api.setResponse('/api/talks/voted/', []);
    return talks.componentDidMount().then(() => {
      expect(talks.state.talks.results).toEqual(results);
      var latest = TestUtils.scryRenderedDOMComponentsWithTag(talks, 'a')[0];
      expect(latest.textContent).toEqual('Goto Latest Links');
    })
  });

  pit('should fetch new talks', function() {
    var newProps = {
      params: {tab: 'latest'},
      location: {query: {}}
    };
    api.setResponse('/api/talks/?tab=latest&page=1',
      JSON.stringify({results: []}));
    return talks.componentWillReceiveProps(newProps).then(() => {
      expect(talks.state.talks.results).toEqual([]);
    });
  });

});
