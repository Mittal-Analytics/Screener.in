'use strict';
jest.autoMockOff();
jest.mock('fetch-on-rest');


describe('Screens Tests', function() {
  var api = require('../../api.js');
  var screens, TestUtils;

  beforeEach(function() {
    var React = require('react');
    var Screens = require('../screens.jsx');
    TestUtils = require('react-addons-test-utils');
    screens = TestUtils.renderIntoDocument(<Screens />);
  });

  afterEach(function() {
    expect(api.getPending()).toEqual([]);
  });

  pit('should fetch screens', function() {
    var results = [
      {url: '/foo/', name: 'Foo', description: 'FooBar'},
      {url: '/bar/', name: 'Bar', description: 'BarOne'}
    ];
    api.setResponse('/api/screens/popular/', JSON.stringify({results: results}));
    return screens.componentDidMount().then(() => {
      expect(screens.state.screens.results).toEqual(results);
    })
  });

});
