'use strict';
import React from 'react'
import Confirm from '../confirm.jsx'
import TestUtils from 'react-addons-test-utils'

describe('Confirm tests', function(){
  it('walk confirm test', function() {
    var handleDelete = jest.fn();
    var confirm = TestUtils.renderIntoDocument(
      <Confirm onClick={handleDelete} name="Delete?" />
    );
    var buttons = TestUtils.scryRenderedDOMComponentsWithTag(confirm, 'button');
    expect(buttons.length).toEqual(3);
    expect(confirm.state.showConfirm).toBeFalsy();
    TestUtils.Simulate.click(buttons[0]);
    expect(confirm.state.showConfirm).toBeTruthy();
    expect(handleDelete).not.toBeCalled();
    TestUtils.Simulate.click(buttons[1]);
    expect(handleDelete).toBeCalled();
    TestUtils.Simulate.click(buttons[2]);
    expect(confirm.state.showConfirm).toBeFalsy();
  });
});
