'use strict';
/* global jest, require */
jest.dontMock('../action.rows.jsx');

describe('action.rows Tests', function() {
  var actions, TestUtils, dummy, Api;

  beforeEach(function() {
    var React = require('react');
    Api = require('../../api.js');
    var ActionRows = require('../action.rows.jsx');
    TestUtils = require('react-addons-test-utils');
    dummy = jest.genMockFunction();
    var items = [
      {name: 'Foo'},
      {name: 'Bar'},
    ];
    function getDisplayName(item){
      return item.name;
    }
    actions = TestUtils.renderIntoDocument(
      <ActionRows
        items={items}
        getDisplayName={getDisplayName}
        handleRemove={dummy} />
    );
  });

  afterEach(function() {
    expect(Api.__getPending()).toEqual([]);
  });

  it('should render two rows', function() {
    var rows = TestUtils.scryRenderedDOMComponentsWithTag(
      actions, 'tr'
    );
    expect(rows.length).toBe(2);
  });

});
