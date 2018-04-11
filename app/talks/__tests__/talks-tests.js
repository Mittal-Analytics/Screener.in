'use strict';
jest.disableAutomock();
jest.mock('fetch-on-rest');
import api from '../../api.js'
import React from 'react'
import Talks from '../talks.jsx'
import TestUtils from 'react-addons-test-utils'

var results = [
  {
    url: '/foo/', title: 'Foo is Barring', id: 1, short_url: 'foo', user: 2
  }
];

describe('talks Tests', function() {
  var talks

  beforeEach(function() {
    var params = {};
    var location = {query: {}};
    window.loggedIn = true;
    window.userId = 32;
    api.setResponse('/api/talks/?tab=top&page=1',
      JSON.stringify({results: results}));
    api.setResponse('/api/talks/voted/', "[]");
    talks = TestUtils.renderIntoDocument(
      <Talks params={params} location={location} />
    );
  });

  afterEach(function() {
    expect(api.getPending()).toEqual([]);
  });

  it('should load talks', function() {
    return talks._req.then(() => {
      expect(talks.state.talks.results).toEqual(results);
      var latest = TestUtils.scryRenderedDOMComponentsWithTag(talks, 'a')[0];
      expect(latest.textContent).toEqual('Goto Latest Links');
    })
  });

  it('should fetch new talks', function() {
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
