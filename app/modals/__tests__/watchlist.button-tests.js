'use strict';
/* global jest, require, window */
jest.dontMock('../watchlist.button.jsx');

describe('Watchlist Button tests', function() {
  var Api, TestUtils, watchlist;

  beforeEach(function() {
    Api = require('../../api.js');
    window.loggedIn = true;
    TestUtils = require('react-addons-test-utils');
    var React = require('react');
    var WatchlistButton = require('../watchlist.button.jsx');
    var onClose = jest.genMockFunction();
    watchlist = TestUtils.renderIntoDocument(
      <WatchlistButton onClose={onClose} />
    );
    // Open the modal
    var button = TestUtils.findRenderedDOMComponentWithTag(
      watchlist, 'button'
    );
    TestUtils.Simulate.click(button);
    Api.__setResponse(['company'], []);
    jest.runAllTimers();
    expect(watchlist.state.items).toEqual([]);
  });

  afterEach(function() {
    expect(Api.__getPending()).toEqual([]);
  });

  it('adds company', function() {
    var company = {name: 'Patanjali', id: 7, url: '/ramdev/'};
    watchlist.handleAdd(company);
    Api.__setResponse(Api.cid(7, 'favorite'), [company]);
    jest.runAllTimers();
    expect(watchlist.state.items).toEqual([company]);
  });
});
