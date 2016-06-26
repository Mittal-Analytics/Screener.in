'use strict';
jest.disableAutomock()
jest.mock('fetch-on-rest')
var api = require('../../api.js');
var React = require('react');
var Screens = require('../screens.jsx');
var TestUtils = require('react-addons-test-utils');


describe('Screens Tests', function() {
  var results = [
    {url: '/foo/', name: 'Foo', description: 'FooBar'},
    {url: '/bar/', name: 'Bar', description: 'BarOne'}
  ];
  var screens;

  beforeEach(function() {
    api.setResponse('/api/screens/popular/', JSON.stringify({results: results}));
    screens = TestUtils.renderIntoDocument(<Screens />);
  });

  afterEach(function() {
    expect(api.getPending()).toEqual([]);
  });

  it('should fetch screens', function() {
    return screens._req.then(() => {
      expect(screens.state.screens.results).toEqual(results);
    })
  });

});
