'use strict';
/* global jest, require */
jest.dontMock('../icon.jsx');

describe('icon Tests', function() {
  var icon, TestUtils;

  beforeEach(function() {
    var React = require('react');
    var ReactDOM = require('react-dom');
    var Icon = require('../icon.jsx');
    TestUtils = require('react-addons-test-utils');
    icon = TestUtils.renderIntoDocument(<div>
      <Icon name="pencil" />
    </div>);
    var domNode = ReactDOM.findDOMNode(icon);
    icon = domNode.getElementsByTagName('i')[0];
  });

  it('should render icon', function() {
    expect(icon.outerHTML).toEqual(
      '<i class="glyphicon glyphicon-pencil"></i>'
    );
  });

});
