'use strict';

describe('button Tests', function() {
  var button, TestUtils, dummy;

  beforeEach(function() {
    var React = require('react');
    var ReactDOM = require('react-dom');
    var Button = require('../button.jsx');
    TestUtils = require('react-addons-test-utils');
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
