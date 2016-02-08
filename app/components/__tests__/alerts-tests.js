'use strict';
/* global jest, require */
jest.dontMock('../alerts.jsx');

describe('alerts Tests', function() {
  var alerts, TestUtils;

  beforeEach(function() {
    var React = require('react');
    var Alert = require('../alerts.jsx');
    TestUtils = require('react-addons-test-utils');
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

  it('should show alerts', function() {
    expect(alerts.textContent).toEqual(
      ' Bad requestDisplay Name: cannot be blank'
    );
  });

});
