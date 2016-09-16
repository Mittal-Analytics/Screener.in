'use strict';

describe('getPageNumbers Tests', function(){
  it('ensure the correct page numbers', function() {
    var getPageNumbers = require('../utils.js').getPageNumbers;
    expect(getPageNumbers(1, 1)).toEqual([1]);
    expect(getPageNumbers(1, 5)).toEqual([1, 2, '…', 5]);
    expect(getPageNumbers(5, 5)).toEqual([1, '…', 4, 5]);
    expect(getPageNumbers(4, 5)).toEqual([1, '…', 3, 4, 5]);
    expect(getPageNumbers(4, 7)).toEqual([1, '…', 3, 4, 5, '…', 7]);
    expect(getPageNumbers(4, 10)).toEqual([1, '…', 3, 4, 5, '…', 10]);
    expect(getPageNumbers(7, 100)).toEqual([1, '…', 6, 7, 8, '…', 100]);
  });
});


describe('getFormData Tests', function() {

  var form;

  beforeEach(function() {
    var React = require('react');
    var ReactDOM = require('react-dom');
    var TestUtils = require('react-addons-test-utils');
    var html = TestUtils.renderIntoDocument(<div>
      <form>

        <div className="form-group ">
          <label>Ratio unit </label>
          <select className="form-control" name="select_box">
            <option value="" selected>----</option>
            <option value="foo" selected >Foo</option>
            <option value="bar"  >Bar</option>
          </select>
        </div>

        <input type="checkbox" label="Foo" name="check_foo" value="fb" checked />
        <input type="checkbox" label="Bar" name="check_bar" value="fb" />

        <textarea name="text_area" value="Bar" />
      </form>
    </div>);
    var domNode = ReactDOM.findDOMNode(html);
    form = domNode.getElementsByTagName('form')[0];
  });

  it('should get for data in dictionary', function() {
    var getFormData = require('../utils.js').getFormData;
    var data = getFormData(form);
    expect(data).toEqual({
      check_bar: false,
      check_foo: 'fb',
      select_box: 'foo',
      text_area: 'Bar'
    })
  });
})
