'use strict';
jest.useFakeTimers()
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Notify from '../notify.jsx'

describe('Notify Tests', function() {
  var notify, button, dummy

  var delayed = function() {
    return new Promise(function(resolve) {
      setTimeout(() => resolve(true), 5000);
    });
  };

  beforeEach(function() {
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

  it('should show proceccsing', function() {
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
