'use strict';
/* global jest, require */
jest.dontMock('../login.jsx');


describe('Login tests', function(){
  it('should render the login box', function() {
    var React = require('react');
    var ReactDOM = require('react-dom');
    var TestUtils = require('react-addons-test-utils');
    var Login = require('../login.jsx');
    var login = TestUtils.renderIntoDocument(
      <div><Login /></div>
    );
    var domNode = ReactDOM.findDOMNode(login);
    expect(domNode.textContent).toContain('Free Investor Registration');
  });
});
