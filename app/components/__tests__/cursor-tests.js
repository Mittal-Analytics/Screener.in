"use strict";


describe('test GetLastWord', function() {
  it('gets correct last words', function() {
    var getLastWord = require('../cursor.js');
    var sentence;
    sentence = "Book value";
    expect(getLastWord(sentence)).toBe('Book value');
    sentence = "Book value +";
    expect(getLastWord(sentence)).toBe('');
    sentence = "Book value +market capi ";
    expect(getLastWord(sentence)).toBe('market capi ');
    sentence = "Book value +market cap and\n";
    expect(getLastWord(sentence)).toBe('');
  });
});
