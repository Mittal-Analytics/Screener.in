'use strict';
jest.disableAutomock();
jest.mock('fetch-on-rest');
import ManageAlerts from '../manage.alerts.jsx'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import api from '../../api.js'

describe('alerts Tests', function() {
  var alerts

  beforeEach(function() {
    window.loggedIn = true;
    window.userId = 7;
    api.setResponse('/api/alerts/', JSON.stringify(
      {results: [{name: 'Foo'}]}));
    api.setResponse('/api/users/me/', JSON.stringify({
      watchlist_alert: false}));
    alerts = TestUtils.renderIntoDocument(
      <ManageAlerts />
    );
  });

  afterEach(function() {
    expect(api.getPending()).toEqual([]);
  });

  it("should get user's alerts", function() {
    return alerts._req.then(() => {
      expect(alerts.state.watchlistAlert).toBe(false);
    })
  });

  it("should toggle watchlist alerts", function() {
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
