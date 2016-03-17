'use strict';
/* global jest, require */
jest.autoMockOff();
jest.mock('fetch-on-rest');

describe('alerts Tests', function() {
  var api = require('../../api.js');
  var alerts, TestUtils;

  beforeEach(function() {
    var React = require('react');
    var ManageAlerts = require('../manage.alerts.jsx');
    TestUtils = require('react-addons-test-utils');
    window.loggedIn = true;
    window.userId = 7;
    alerts = TestUtils.renderIntoDocument(
      <ManageAlerts />
    );
  });

  afterEach(function() {
    expect(api.getPending()).toEqual([]);
  });

  pit("should get user's alerts", function() {
    api.setResponse('/api/users/me/', JSON.stringify({
      watchlist_alert: false}));
    api.setResponse('/api/alerts/', JSON.stringify(
      {results: [{name: 'Foo'}]}));
    return alerts.componentDidMount().then(() => {
      expect(alerts.state.watchlistAlert).toBe(false);
    })
  });

  pit("should toggle watchlist alerts", function() {
    window.fetch.mockClear();
    api.setResponse('/api/users/7/', '{}');
    return alerts.handleWatchlistToggle().then(() => {
      expect(window.fetch.mock.calls[0][1].method).toEqual('PATCH');
      expect(window.fetch.mock.calls[0][1].body).toEqual(
        '{"watchlist_alert":false}');
      expect(alerts.state.watchlistAlert).toBe(false);
    });
  })

});
