"use strict";
/* global jest, setTimeout, requireActual */
var ApiMock = require.requireActual('../api.js');

function getKey(url, params) {
  var key = {
    url: url,
    load: params
  };
  return JSON.stringify(key);
}

var __timeout = 500;
var __responses = {};
function __setResponse(url, response) {
  var key;
  if(url.hasOwnProperty('url') && url.hasOwnProperty('load'))
    key = getKey(url.url, url.load);
  else
    key = getKey(url);
  __responses[key] = response;
}

function __getPending() {
  var pending = [];
  for (var property in __responses) {
    if (__responses.hasOwnProperty(property)) {
      pending.push(property);
    }
  }
  return pending;
}

var fakeRequest = function(url, params) {
  var then = jest.genMockFunction().mockImplementation(function(callback) {
    var key = getKey(url, params);
    return setTimeout(
      function() {
        if(!__responses.hasOwnProperty(key))
          throw new Error("Unknown call: " + key);
        var response = __responses[key];
        delete __responses[key];
        callback(response);
      },
      __timeout
    );
  });
  return {then: then};
};

ApiMock.raw = ApiMock.get = ApiMock.post = ApiMock.patch = ApiMock.delete = ApiMock.put = jest.genMockFunction().mockImplementation(fakeRequest);

ApiMock.__timeout = __timeout;
ApiMock.__setResponse = __setResponse;
ApiMock.__getPending = __getPending;

module.exports = ApiMock;
