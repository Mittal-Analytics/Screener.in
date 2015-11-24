"use strict";
/* global require, window, jest */
jest.dontMock('../peers.jsx');

describe('Peers tests', function () {
  it('renders a peers table', function() {
    var React = require('react');
    var ReactDOM = require('react-dom');
    var TestUtils = require('react-addons-test-utils');
    var Peers = require('../peers.jsx');
    var props = {wid: 22, industry: 'Hi', short_name: 'hi'};
    var peers = TestUtils.renderIntoDocument(
      <Peers {...props} />
    );
    var dom = ReactDOM.findDOMNode(peers);
    expect(dom.textContent).toContain('Peer Comparison ');
  });
});
