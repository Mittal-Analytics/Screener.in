'use strict';
jest.unmock('../button.jsx');
jest.unmock('../confirm.jsx');


describe('Confirm tests', function(){
  it('walk confirm test', function() {
    var React = require('react');
    var TestUtils = require('react-addons-test-utils');
    var handleDelete = jest.fn();
    var Confirm = require('../confirm.jsx');
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
