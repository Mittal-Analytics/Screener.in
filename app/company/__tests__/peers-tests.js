"use strict";
jest.disableAutomock();
jest.mock('fetch-on-rest');
import api from '../../api.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Peers from '../peers.jsx'

describe('Peers tests', function () {
  var peerResults = {
    ratios: [],
    results: []
  };

  afterEach(function() {
    expect(api.getPending()).toEqual([]);
  });

  it('renders a peers table', function() {
    var company = {
      short_name: 'hi',
      warehouse_set: {
        id: 22,
        industry: 'Hi'
      }
    }
    api.setResponse('/api/company/22/peers/?industry=Hi',
      JSON.stringify(peerResults));
    var peers = TestUtils.renderIntoDocument(
      <Peers company={company} />
    );
    return peers._req.then(() => {
      var dom = ReactDOM.findDOMNode(peers);
      expect(dom.textContent).toContain('Peer Comparison ');
    })
  });
});
