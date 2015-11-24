'use strict';
/* global jest, require */
jest.dontMock('../profile.jsx');
jest.dontMock('app/components/utils.js');

describe('profile Tests', function() {
  var profile, TestUtils, dummy, Api;

  beforeEach(function() {
    var React = require('react');
    Api = require('../../api.js');
    var Profile = require('../profile.jsx');
    TestUtils = require('react-addons-test-utils');
    window.loggedIn = true;
    window.userId = 33;
    dummy = jest.genMockFunction();
    profile = TestUtils.renderIntoDocument(
      <Profile />
    );
  });

  afterEach(function() {
    expect(Api.__getPending()).toEqual([]);
  });

  it('should load form', function() {
    Api.__setResponse('/api/users/33.html', '<input name="name" value="hi" />');
    jest.runAllTimers();
    var Utils = require('app/components/utils.js');
    var data = Utils.getFormData(profile.refs.form);
    expect(data.name).toEqual('hi');
  });

});
