'use strict';
/* global jest, require, window */
jest.autoMockOff();
jest.mock('fetch-on-rest');


describe('Columns modal tests', function() {
  var api = require('app/api.js');
  var React, TestUtils, ManageColumns;

  beforeEach(function() {
    React = require('react');
    TestUtils = require('react-addons-test-utils');
    ManageColumns = require('../columns.modal.jsx');
  });

  afterEach(function() {
    expect(api.getPending()).toEqual([]);
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

  pit('shows modal box', function() {
    window.loggedIn = true;
    api.setResponse('/api/users/me/', JSON.stringify({icolumns: 'PE;CMP'}));
    var onClose = jest.genMockFunction();
    var Button = TestUtils.renderIntoDocument(
      <ManageColumns onClose={onClose} />
    );
    var button = TestUtils.findRenderedDOMComponentWithTag(
      Button, 'button');
    expect(Button.state.items).toEqual([]);
    TestUtils.Simulate.click(button);
    return Button.req.then(() => {
      expect(Button.state.items).toEqual(['PE', 'CMP']);
    })
  });

});
