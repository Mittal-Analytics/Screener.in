'use strict';

describe('QuickRatios tests', function() {
  var React, TestUtils, QuickRatiosModal;

  beforeEach(function() {
    React = require('react');
    TestUtils = require('react-addons-test-utils');
    QuickRatiosModal = require('../quickratios.modal.jsx');
  });

  it('renders modal', function() {
    var onClose = jest.genMockFunction();
    var ratios = [['PE', 'Price to Earning', '']];
    TestUtils.renderIntoDocument(
      <QuickRatiosModal onClose={onClose} items={ratios} />
    );
  });
});
