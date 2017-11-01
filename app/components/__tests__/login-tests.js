'use strict';
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Login from '../login.jsx'

describe('Login tests', function(){
  it('should render the login box', function() {
    var login = TestUtils.renderIntoDocument(
      <div><Login /></div>
    );
    var domNode = ReactDOM.findDOMNode(login);
    expect(domNode.textContent).toContain('Free Investor Registration');
  });
});
