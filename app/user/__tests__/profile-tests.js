'use strict';
/* global jest, require */
jest.autoMockOff();
jest.mock('fetch-on-rest');

describe('profile Tests', function() {
  var api = require('../../api.js');
  var profile, TestUtils;

  beforeEach(function() {
    var React = require('react');
    var Profile = require('../profile.jsx');
    TestUtils = require('react-addons-test-utils');
    window.loggedIn = true;
    window.userId = 33;
    profile = TestUtils.renderIntoDocument(
      <Profile />
    );
  });

  afterEach(function() {
    expect(api.getPending()).toEqual([]);
  });

  pit('should load form', function() {
    api.setResponse('/api/users/33.html', '<input name="name" value="hi" />');
    return profile.componentDidMount().then(() => {
      var Utils = require('app/components/utils.js');
      var data = Utils.getFormData(profile.refs.form);
      expect(data.name).toEqual('hi');
    });
  });
});
