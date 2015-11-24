'use strict';
/* global jest, require */
jest.dontMock('../typeahead.jsx');


describe('Typeahead', function(){
  it('calls given function on change', function() {
    var React = require('react');
    var TestUtils = require('react-addons-test-utils');
    var Typeahead = require('../typeahead.jsx');
    var options = [
      {name: 'apple', url: '#', id: 3},
      {name: 'mango', url: '#', id:9}
    ];
    var selected;
    function select(idx) {
      selected = options[idx];
    }
    var onChange = jest.genMockFunction();
    var search = TestUtils.renderIntoDocument(
      <Typeahead
        options={options}
        onChange={onChange}
        onSelect={select}
      />
    );
    var input = search.refs.input;
    TestUtils.Simulate.change(input, {target: {value: 'a'}});
    jest.runAllTimers();
    expect(onChange).toBeCalled();
    TestUtils.Simulate.keyDown(input, {key: "Down", which: 40, keyCode: 40});
    TestUtils.Simulate.keyDown(input, {key: "Enter", which: 13, keyCode: 13});
    expect(selected.name).toEqual('mango');
  });
});
