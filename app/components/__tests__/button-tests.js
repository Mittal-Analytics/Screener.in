import React from 'react'
import ReactDOM from 'react-dom'
import Button from '../button.jsx'
import TestUtils from 'react-addons-test-utils'

describe('button Tests', function() {
  var button, dummy

  beforeEach(function() {
    dummy = jest.genMockFunction();
    button = TestUtils.renderIntoDocument(<div>
      <Button
        style="primary"
        icon="pencil"
        onClick={dummy}
        name="Submit"
      />
    </div>);
    var domNode = ReactDOM.findDOMNode(button);
    button = domNode.getElementsByTagName('button')[0];
  });

  it('should trigger click', function() {
    expect(dummy).not.toBeCalled();
    TestUtils.Simulate.click(button);
    expect(dummy).toBeCalled();
  });

});
