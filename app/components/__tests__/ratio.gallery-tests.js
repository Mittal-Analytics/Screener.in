'use strict';
jest.disableAutomock();
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import RatioGallery from '../ratio.gallery.jsx'

var RATIOS = {
  "user_ratios":[],
  "system_ratios":[
    ["Rs.Cr.","Sales last year","Sales last year.","Annual Results"],
    ["Rs.Cr.","Operating profit last year","Operating Profit last year.","Annual Results"],
    ["Rs.Cr.","Sales preceding year","Sales as per preceding annual results.","Annual Results"],
    ["Rs.Cr.","Operating profit preceding year","Operating Profit as per preceding annual results.","Annual Results"],
    ["Cr.","Sales 3year back","Sales old","Annual Results"],
    ["Cr.","Sales 5Years back","Sales old","Annual Results"],
    ["Rs.Cr.","Average Earnings 5Year","Average profit during last 5 annual results.","Annual Variations"],["Rs.Cr.","Average Earnings 10Year","Average profit during last 10 annual results.","Annual Variations"],
    ["Rs.Cr.","Depreciation","Depreciation in the preceding 12 months.","Trailing 12 Months"]
  ]
}


describe('Typeahead', function(){
  var gallery

  beforeEach(function() {
    var onOpen = jest.genMockFunction()
    var onClose = jest.genMockFunction()
    var onRatioClick = jest.genMockFunction()
    gallery = TestUtils.renderIntoDocument(
      <RatioGallery
        onOpen={onOpen}
        onClose={onClose}
        onRatioClick={onRatioClick}
      />
    );
  })

  it('should group ratios by periods', function() {
    var ratios = RATIOS.system_ratios
    var result = gallery.getCategoryGroups(ratios, "Annual Results")
    var expected = {
      "recent": [
        ratios[0],
        ratios[1]
      ],
      "preceding": [
        ratios[2],
        ratios[3]
      ],
      "historical": [
        ratios[4],
        ratios[5]
      ]
    }
    expect(result).toEqual(expected)
  })
});
