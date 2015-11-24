'use strict';
/* global jest, require */
jest.dontMock('../manage.alerts.jsx');

describe('alerts Tests', function() {
  var alerts, TestUtils, dummy, Api;

  beforeEach(function() {
    var React = require('react');
    Api = require('../../api.js');
    var ManageAlerts = require('../manage.alerts.jsx');
    TestUtils = require('react-addons-test-utils');
    dummy = jest.genMockFunction();
    window.loggedIn = true;
    window.userId = 7;
    alerts = TestUtils.renderIntoDocument(
      <ManageAlerts />
    );
  });

  afterEach(function() {
    expect(Api.__getPending()).toEqual([]);
  });

  it("should get user's alerts", function() {
    Api.__setResponse(['users', 'me'], {watchlist_alert: false});
    Api.__setResponse(['alerts'], {results: [{name: 'Foo'}]});
    jest.runAllTimers();
    expect(alerts.state.watchlistAlert).toBe(false);
    alerts.handleWatchlistToggle();
    var req = {
      url: ['users', 7],
      load: {watchlist_alert: true}
    };
    Api.__setResponse(req, true);
    jest.runAllTimers();
    expect(alerts.state.watchlistAlert).toBe(true);
  });

});
