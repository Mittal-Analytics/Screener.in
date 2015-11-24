'use strict';
/* global jest, require, window */
jest.dontMock('../columns.modal.jsx');

describe('Columns modal tests', function() {
  var React, TestUtils, ManageColumns, Api;

  beforeEach(function() {
    React = require('react');
    TestUtils = require('react-addons-test-utils');
    ManageColumns = require('../columns.modal.jsx');
    Api = require('../../api.js');
  });

  afterEach(function() {
    expect(Api.__getPending()).toEqual([]);
  });

  it('shows login box', function() {
    var onClose = jest.genMockFunction();
    var Button = TestUtils.renderIntoDocument(
      <ManageColumns onClose={onClose} />
    );
    var button = TestUtils.findRenderedDOMComponentWithTag(
      Button, 'button');
    TestUtils.Simulate.click(button);
    var title = TestUtils.findRenderedDOMComponentWithTag(
      Button, 'h3'
    );
    expect(title.textContent).toEqual('Please register to use this feature');
  });

  it('shows modal box', function() {
    window.loggedIn = true;
    Api.__setResponse(['users', 'me'], {icolumns: 'PE;CMP'});
    var onClose = jest.genMockFunction();
    var Button = TestUtils.renderIntoDocument(
      <ManageColumns onClose={onClose} />
    );
    var button = TestUtils.findRenderedDOMComponentWithTag(
      Button, 'button');
    expect(Button.state.items).toEqual([]);
    TestUtils.Simulate.click(button);
    expect(Button.state.items).toEqual([]);
    jest.runAllTimers();
    expect(Button.state.items).toEqual(['PE', 'CMP']);
  });

});
