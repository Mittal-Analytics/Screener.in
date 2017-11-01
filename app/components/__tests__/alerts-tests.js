'use strict';
import ReactDOM from 'react-dom'
import React from 'react'
import Alert from '../alerts.jsx'
import TestUtils from 'react-addons-test-utils'

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
    alerts = ReactDOM.findDOMNode(alerts);
  });

  it('should show alerts', function() {
    expect(alerts.textContent).toEqual(
      ' Bad requestDisplay Name: cannot be blank'
    );
  });

});
