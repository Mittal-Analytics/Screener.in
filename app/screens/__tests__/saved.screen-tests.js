'use strict';
/* global jest, require */
jest.autoMockOff();
jest.mock('fetch-on-rest');

const screenResult = {
  name: 'Foo Bar',
  page: {
    ratios: ['CMP'],
    results: [
      ['/foo/', 'Foo', 11]
    ]
  }
};

describe('Tests for Saved Screen', function() {
  var api = require('app/api.js');
  var screen, TestUtils;

  beforeEach(function() {
    var React = require('react');
    var Screen = require('../saved.screen.jsx');
    TestUtils = require('react-addons-test-utils');
    screen = TestUtils.renderIntoDocument(
      <Screen
        params={{screenId: 3}}
        location={{
          query: {foo: 'bar'},
          pathname: '/screen/3/',
          search: '?foo=bar'
        }}
        history={{}}
      />
    );
  });

  afterEach(function() {
    expect(api.getPending()).toEqual([]);
  });

  pit('should load the screen', function() {
    api.setResponse('/api/screens/3/?foo=bar',
      JSON.stringify(screenResult));
    return screen.componentDidMount().then(() => {
      expect(1).toEqual(1);
    })
  })

});
