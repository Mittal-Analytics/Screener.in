'use strict';
/* global jest, require */
jest.dontMock('../notify.jsx');

describe('Notify Tests', function() {
  var notify, button, TestUtils, dummy, Api;

  beforeEach(function() {
    var React = require('react');
    Api = require('../../api.js');
    var Notify = require('../notify.jsx');
    TestUtils = require('react-addons-test-utils');
    dummy = jest.genMockFunction()
      .mockImplementation(function() {
        return Api.get('/foo/');
      });
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

  afterEach(function() {
    expect(Api.__getPending()).toEqual([]);
  });

  it('should show proceccsing', function() {
    expect(dummy).not.toBeCalled();
    expect(notify.state.status).toBe('initial');
    TestUtils.Simulate.click(button);
    expect(dummy).toBeCalled();
    expect(notify.state.status).toBe('pending');
    Api.__setResponse('/foo/', true);
    jest.runAllTimers();
    expect(notify.state.status).toBe('done');
  });


});
