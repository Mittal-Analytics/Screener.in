'use strict';
jest.useFakeTimers()
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Typeahead from '../typeahead.jsx'


describe('Typeahead', function(){
  it('calls given function on change', function() {
    var options = [
      {name: 'apple', url: '#', id: 3},
      {name: 'mango', url: '#', id:9}
    ];
    var selected;
    function _select(idx) {
      selected = options[idx];
    }
    var onSelect = jest.genMockFunction().mockImplementation(_select);
    var onChange = jest.genMockFunction();
    var search = TestUtils.renderIntoDocument(
      <Typeahead
        options={options}
        onChange={onChange}
        onSelect={onSelect}
        placeholder="Fruits"
      />
    );
    var input = search.refs.input;
    input.value = 'a';
    TestUtils.Simulate.change(input, {target: {value: 'a'}});
    jest.runAllTimers();
    expect(onChange).toBeCalled();
    TestUtils.Simulate.keyDown(input, {key: "Down", which: 40, keyCode: 40});
    TestUtils.Simulate.keyDown(input, {key: "Enter", which: 13, keyCode: 13});
    expect(onSelect).toBeCalled();
    expect(onSelect).toBeCalledWith(1);
    expect(selected.name).toEqual('mango');
  });
});
