'use strict';
/* global jest, require */
jest.disableAutomock()
jest.mock('fetch-on-rest');
var api = require('../../api.js');
var React = require('react');
var Profile = require('../profile.jsx');
var TestUtils = require('react-addons-test-utils');

describe('profile Tests', function() {
  var profile

  beforeEach(function() {
    window.loggedIn = true;
    window.userId = 33;
    api.setResponse('/api/users/33.html', '<input name="name" value="hi" />');
    profile = TestUtils.renderIntoDocument(
      <Profile />
    );
  });

  afterEach(function() {
    expect(api.getPending()).toEqual([]);
  });

  it('should load form', function() {
    return profile._req.then(() => {
      var Utils = require('../../components/utils.js');
      var data = Utils.getFormData(profile.refs.form);
      expect(data.name).toEqual('hi');
    });
  });
});
