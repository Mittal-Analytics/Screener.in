'use strict';
/* global jest, require */
jest.dontMock('../quickratios.modal.jsx');

describe('QuickRatios tests', function() {
  var React, TestUtils, ReactDOM, QuickRatiosModal;

  beforeEach(function() {
    React = require('react');
    TestUtils = require('react-addons-test-utils');
    QuickRatiosModal = require('../quickratios.modal.jsx');
    ReactDOM = require('react-dom');
  });

  it('renders modal', function() {
    var onClose = jest.genMockFunction();
    var ratios = [['PE', 'Price to Earning', '']];
    var Modal = TestUtils.renderIntoDocument(
      <QuickRatiosModal onClose={onClose} items={ratios} />
    );
  });
});
