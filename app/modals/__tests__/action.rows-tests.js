'use strict';
/* global jest, require */
jest.dontMock('../action.rows.jsx');

describe('action.rows Tests', function() {
  var actions, TestUtils, dummy;

  beforeEach(function() {
    var React = require('react');
    var ActionRows = require('../action.rows.jsx');
    TestUtils = require('react-addons-test-utils');
    dummy = jest.genMockFunction();
    var items = [
      {name: 'Foo'},
      {name: 'Bar'}
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

  it('should render two rows', function() {
    var rows = TestUtils.scryRenderedDOMComponentsWithTag(
      actions, 'tr'
    );
    expect(rows.length).toBe(2);
  });

});
