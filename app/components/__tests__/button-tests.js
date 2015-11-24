'use strict';
/* global jest, require */
jest.dontMock('../button.jsx');

describe('button Tests', function() {
  var button, TestUtils, dummy, Api;

  beforeEach(function() {
    var React = require('react');
    var ReactDOM = require('react-dom');
    Api = require('../../api.js');
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

  afterEach(function() {
    expect(Api.__getPending()).toEqual([]);
  });

  it('should trigger click', function() {
    expect(dummy).not.toBeCalled();
    TestUtils.Simulate.click(button);
    expect(dummy).toBeCalled();
  });

});
