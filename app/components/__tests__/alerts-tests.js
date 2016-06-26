'use strict';
jest.disableAutomock();
var React = require('react');
var Alert = require('../alerts.jsx');
var TestUtils = require('react-addons-test-utils');

describe('alerts Tests', function() {
  var alerts

  beforeEach(function() {
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
