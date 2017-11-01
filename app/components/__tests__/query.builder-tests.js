'use strict'
jest.useFakeTimers()
import React from 'react'
import Builder from '../query.builder.jsx'

var OPTIONS = [{"short_name":"B.V.","name":"Book value","unit":"Rs.","description":"Book value per share"},{"short_name":"CMP / BV","name":"Price to book value","unit":"","description":"Price to book value of the stock."},{"short_name":"BV Unq Invest","name":"Book value of unquoted investments","unit":"Rs.Cr.","description":"Book value of unquoted investments from latest balance sheet."},{"short_name":"PB X PE","name":"PB X PE","unit":"","description":"Graham number is the formula Ben Graham used to calculate the maximum price one should pay for a stock. As per this rule, the product of a stock’s price to earnings (P/E) and price to book value (P/BV) should not be more than 22.5 i.e., P/E of 15 multiplied by P/BV of 1.5."},{"short_name":"Net worth","name":"Net worth","unit":"Rs.Cr.","description":"Company's net worth (or total book value)"},{"short_name":"Ind PBV","name":"Industry PBV","unit":"","description":"Industrial Price to Book Value"}]


describe('Query Builder Interaction Tests', function(){

  var TestUtils, builder

  beforeEach(function() {
    TestUtils = require('react-addons-test-utils')
    var assist = {
      lead: 'Custom Builder Example',
      description: <p>This is shown in side menu</p>,
      help: 'Should provide more help'
    }
    builder = TestUtils.renderIntoDocument(
      <Builder name="query" placeholder="Eg. Foo / Bar" assist={assist} />
    )
  });

  it('calls given function on change', function() {
    var textarea = builder.refs.textarea
    textarea.fetchOptions = jest.genMockFunction()
    var input = textarea.refs.input;
    input.value = 'book';
    input.selectionStart = 4;
    input.selectionEnd = 4;
    TestUtils.Simulate.change(input, {target: {value: 'book'}})
    jest.runAllTimers()
    expect(textarea.state.hideMenu).toEqual(false)
    textarea.setState({options: OPTIONS})
    jest.runAllTimers()
    expect(textarea.fetchOptions).toBeCalled()
    expect(textarea.fetchOptions).toBeCalledWith('book')
    TestUtils.Simulate.keyDown(input, {key: "Down", which: 40, keyCode: 40});
    TestUtils.Simulate.keyDown(input, {key: "Enter", which: 13, keyCode: 13});
    var expected = {"short_name":"CMP / BV","name":"Price to book value","unit":"","description":"Price to book value of the stock."}
    expect(builder.state.selected).toEqual(expected)
  });
});
