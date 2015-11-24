"use strict";
/* global require, window, jest */

jest.dontMock('../misc.jsx');

var kitex = {
  id: 1950,
  name: 'Kitex Ltd',
  short_name: 'Kitex',
  number_set: {
    balancesheet: [["Equity", []]],
    annual: [["Sales", []]],
    cashflow: [["OCF", []]],
    quarters: [["Sales", []]]
  },
  warehouse_set: {
    id: 6404002,
    "current_price": "230.10",
    "industry": "Textiles",
    "result_type": "sa",
    "pair_url": "/company/500264/consolidated",
    analysis: {
      remarks: [], bad: [], good: []
    }
  },
  announcement_set: [],
  annualreport_set: [],
  companyrating_set: []
};


describe('Walk tests', function () {
  var Misc, TestUtils, Api, ReactDOM;

  beforeEach(function() {
    ReactDOM = require('react-dom');
    Api = require('../../api.js');
    TestUtils = require('react-addons-test-utils');
    Misc = require('../misc.jsx');
  });

  afterEach(function() {
    expect(Api.__getPending()).toEqual([]);
  });

  it('test visible add to watchlist button', function() {
    var React = require('react');
    var dummy = jest.genMockFunction().mockImplementation(
      function(cid) {
        return Api.post(['company', cid, 'favorite']);
      }
    );
    var header = TestUtils.renderIntoDocument(<div>
      <Misc.CompanyHeader
        company={kitex}
        favorites={[1, 2]}
        handleFavorite={dummy}
        />
    </div>);
    var domNode = ReactDOM.findDOMNode(header);
    var button = domNode.getElementsByTagName('button')[0];
    TestUtils.Simulate.click(button);
    expect(dummy).toBeCalled();
    expect(dummy.mock.calls.length).toBe(1);
    expect(dummy.mock.calls[0][0]).toBe(1950);

    // button hiddend when in favorites
    header = TestUtils.renderIntoDocument(<div>
      <Misc.CompanyHeader
        company={kitex}
        favorites={[1950, 2]}
        handleFavorite={dummy}
        />
    </div>);
    domNode = ReactDOM.findDOMNode(header);
    button = domNode.getElementsByTagName('button');
    expect(button.length).toBe(0);
  });

});
