'use strict';
/* global jest, require */
jest.dontMock('../utils.js');


describe('getPageNumbers Tests', function(){
  it('ensure the correct page numbers', function() {
    var getPageNumbers = require('../utils.js').getPageNumbers;
    expect(getPageNumbers(1, 1)).toEqual([1]);
    expect(getPageNumbers(1, 5)).toEqual([1, 2, '…', 5]);
    expect(getPageNumbers(5, 5)).toEqual([1, '…', 4, 5]);
    expect(getPageNumbers(4, 5)).toEqual([1, '…', 3, 4, 5]);
    expect(getPageNumbers(4, 7)).toEqual([1, '…', 3, 4, 5, '…', 7]);
    expect(getPageNumbers(4, 10)).toEqual([1, '…', 3, 4, 5, '…', 10]);
    expect(getPageNumbers(7, 100)).toEqual([1, '…', 6, 7, 8, '…', 100]);
  });
});
