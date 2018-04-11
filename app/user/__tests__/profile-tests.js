'use strict';
/* global jest, require */
jest.disableAutomock()
jest.mock('fetch-on-rest');
import {getFormData} from '../../components/utils.js'
import api from '../../api.js'
import React from 'react'
import Profile from '../profile.jsx'
import TestUtils from 'react-addons-test-utils'

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
      var data = getFormData(profile.refs.form);
      expect(data.name).toEqual('hi');
    });
  });
});
