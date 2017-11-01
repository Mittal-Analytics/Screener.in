'use strict';
jest.disableAutomock()
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import UserTable from '../table.jsx'


describe('Table Tests', function(){
  var screen;
  beforeEach(function() {
    var item = [
      "/company/520123/",
      "ABC India",
      101.7, null
    ];
    var results = Array.apply(null, Array(24));
    results = results.map(function() { return item;});
    screen = {
      id: null,
      query: "1 = 1",
      page: {
        "count": 3999,
        "start": 1,
        "total": 267,
        "limit": 15,
        "ratios": [
          ["Current price", "CMP", "Rs."],
          ['Price to earning', 'P/E', ""]
        ],
        current: 1,
        results: results
      }
    };
  });

  it('ensure the call to server and fetch results', function() {
    var onColumnsChange = jest.genMockFunction();
    var table = TestUtils.renderIntoDocument(<div>
      <UserTable
        page={screen.page}
        link="/screen/raw/"
        query={{query: '1 = 1'}}
        onColumnsChange={onColumnsChange}
      />
    </div>);
    var domNode = ReactDOM.findDOMNode(table);
    var rows = domNode.getElementsByTagName('tr');
    expect(screen.page.results.length).toEqual(24);
    expect(rows.length).toEqual(27);
    var caption = domNode.getElementsByTagName('h3')[0];
    expect(caption.textContent).toEqual(
      '3999 Results Found: Showing Page 1 of 267'
    );
  });
});
