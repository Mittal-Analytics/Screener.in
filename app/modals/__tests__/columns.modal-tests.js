'use strict';
jest.disableAutomock();
jest.mock('fetch-on-rest');
import api from '../../api.js'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import ManageColumns from '../columns.modal.jsx'


describe('Columns modal tests', function() {
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

  it('shows modal box', function() {
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
