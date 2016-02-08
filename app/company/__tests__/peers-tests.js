"use strict";
jest.autoMockOff();
jest.mock('fetch-on-rest');

describe('Peers tests', function () {
  var api = require('app/api.js');
  var peerResults = {
    ratios: [],
    results: []
  };

  afterEach(function() {
    expect(api.getPending()).toEqual([]);
  });

  pit('renders a peers table', function() {
    var React = require('react');
    var ReactDOM = require('react-dom');
    var TestUtils = require('react-addons-test-utils');
    var Peers = require('../peers.jsx');
    var props = {wid: 22, industry: 'Hi', short_name: 'hi'};
    var peers = TestUtils.renderIntoDocument(
      <Peers {...props} />
    );
    api.setResponse('/api/company/22/peers/?industry=Hi',
      JSON.stringify(peerResults));
    return peers.componentDidMount().then(() => {
      var dom = ReactDOM.findDOMNode(peers);
      expect(dom.textContent).toContain('Peer Comparison ');
    })
  });
});
