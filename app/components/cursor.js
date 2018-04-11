'use strict';

function getLastWord(text) {
  // Find last word
  var patt = /\sand\s|\sor\s|[^a-z0-9 ]|\n/gi;
  var parts = text.split(patt);
  if(parts.length)
    return parts[parts.length - 1];
  return '';
}

export default getLastWord
