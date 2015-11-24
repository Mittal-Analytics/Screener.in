'use strict';
/* global jest, require */
jest.dontMock('../icon.jsx');

describe('icon Tests', function() {
  var icon, TestUtils, dummy, Api;

  beforeEach(function() {
    var React = require('react');
    var ReactDOM = require('react-dom');
    Api = require('../../api.js');
    var Icon = require('../icon.jsx');
    TestUtils = require('react-addons-test-utils');
    dummy = jest.genMockFunction();
    icon = TestUtils.renderIntoDocument(<div>
      <Icon name="pencil" />
    </div>);
    var domNode = ReactDOM.findDOMNode(icon);
    icon = domNode.getElementsByTagName('i')[0];
  });

  afterEach(function() {
    expect(Api.__getPending()).toEqual([]);
  });

  it('should render icon', function() {
    expect(icon.outerHTML).toEqual('<i class="glyphicon glyphicon-pencil" data-reactid=".0.0"></i>');
  });

});
