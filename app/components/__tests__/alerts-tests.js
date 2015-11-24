'use strict';
/* global jest, require */
jest.dontMock('../alerts.jsx');

describe('alerts Tests', function() {
  var alerts, TestUtils, dummy, Api;

  beforeEach(function() {
    var React = require('react');
    Api = require('../../api.js');
    var Alert = require('../alerts.jsx');
    TestUtils = require('react-addons-test-utils');
    dummy = jest.genMockFunction();
    var errors = new Error('Bad request');
    errors.json = {
      display_name: 'cannot be blank'
    };
    alerts = TestUtils.renderIntoDocument(<div>
      <Alert errors={errors} />
    </div>);
    var ReactDOM = require('react-dom');
    alerts = ReactDOM.findDOMNode(alerts);
  });

  afterEach(function() {
    expect(Api.__getPending()).toEqual([]);
  });

  it('should show alerts', function() {
    expect(alerts.textContent).toEqual(
      ' Bad requestDisplay Name: cannot be blank'
    );
  });

});
