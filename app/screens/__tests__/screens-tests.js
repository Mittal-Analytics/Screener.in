'use strict';
jest.dontMock('../screens.jsx');

describe('Screens Tests', function() {
  var screens, TestUtils, dummy, Api;

  beforeEach(function() {
    var React = require('react');
    Api = require('../../api.js');
    var Screens = require('../screens.jsx');
    TestUtils = require('react-addons-test-utils');
    dummy = jest.genMockFunction();
    screens = TestUtils.renderIntoDocument(<Screens />);
  });

  afterEach(function() {
    expect(Api.__getPending()).toEqual([]);
  });

  it('should fetch screens', function() {
    var results = [
      {url: '/foo/', name: 'Foo', description: 'FooBar'},
      {url: '/bar/', name: 'Bar', description: 'BarOne'},
    ];
    Api.__setResponse(['screens', 'popular'], {results: results});
    jest.runAllTimers();
    expect(screens.state.screens.results).toEqual(results);
  });

});
