'use strict';
/* global setTimeout */
jest.dontMock('app/components/button.jsx');

describe('Notify Tests', function() {
  var notify, button, TestUtils, dummy;

  var delayed = function() {
    return new Promise(function(resolve) {
      setTimeout(() => resolve(true), 5000);
    });
  };

  beforeEach(function() {
    var React = require('react');
    var Notify = require.requireActual('../notify.jsx');
    TestUtils = require('react-addons-test-utils');
    dummy = jest.genMockFunction()
      .mockImplementation(delayed);
    notify = TestUtils.renderIntoDocument(
      <Notify
        style="primary"
        icon="pencil"
        onClick={dummy}
        name="Launch"
      />
    );
    button = TestUtils.findRenderedDOMComponentWithTag(
      notify, 'button'
    );
  });

  pit('should show proceccsing', function() {
    expect(dummy).not.toBeCalled();
    expect(notify.state.status).toBe('initial');
    TestUtils.Simulate.click(button);
    expect(dummy).toBeCalled();
    expect(notify.state.status).toBe('pending');
    jest.runAllTimers();
    return notify.req.then(() => {
      expect(notify.state.status).toBe('done');
    });
  });

});
