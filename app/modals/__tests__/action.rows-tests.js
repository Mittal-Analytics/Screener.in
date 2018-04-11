'use strict';
jest.disableAutomock()
import React from 'react'
import ActionRows from '../action.rows.jsx'
import TestUtils from 'react-addons-test-utils'

describe('action.rows Tests', function() {
  var actions, dummy

  beforeEach(function() {
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
