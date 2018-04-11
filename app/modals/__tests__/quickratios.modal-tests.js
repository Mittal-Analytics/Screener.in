'use strict';
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import QuickRatiosModal from '../quickratios.modal.jsx'


describe('QuickRatios tests', function() {
  it('renders modal', function() {
    var onClose = jest.genMockFunction();
    var ratios = [['PE', 'Price to Earning', '']];
    TestUtils.renderIntoDocument(
      <QuickRatiosModal onClose={onClose} items={ratios} />
    );
  });
});
