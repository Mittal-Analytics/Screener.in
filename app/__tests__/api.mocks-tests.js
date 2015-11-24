"use strict";
/* global require, window, jest */

describe('Unit tests of mocks of API', function() {
  var Api, mockFn;

  beforeEach(function() {
    Api = require('../api.js');
    mockFn = jest.genMockFunction();
  });

  it('test native arrays', function() {
    expect(Api.me).toEqual(['users', 'me']);
  });

  it('test pending', function() {
    Api.__setResponse(['users', 'me'], {});
    expect(Api.__getPending().length).toEqual(1);
    Api.get(Api.me).then(mockFn);
    expect(Api.__getPending().length).toEqual(1);
    jest.runAllTimers();
    expect(Api.__getPending().length).toEqual(0);
  });

  it('test with params', function() {
    var req = {
      url: ['users', 'me'],
      load: {foo: 'bar'}
    };
    Api.__setResponse(req, {});
    Api.get(['users', 'me'], {foo: 'bar'}).then(mockFn);
    jest.runAllTimers();
    expect(Api.__getPending().length).toEqual(0);
  });

  it('test unmocked call', function() {
    Api.get('/hi/').then(mockFn);
    var error = 'Unknown call: {"url":"/hi/"}';
    expect(jest.runAllTimers).toThrow(new Error(error));
  });

  it('test params call error', function() {
    Api.get(['hi'], {foo: 'bar'}).then(mockFn);
    Api.__setResponse(['hi'], 'no foo');
    var error = 'Unknown call: {"url":["hi"],"load":{"foo":"bar"}}';
    expect(jest.runAllTimers).toThrow(new Error(error));
  });

  it('should return mocked value', function() {
    var mocked = jest.genMockFunction();
    Api.get('/foo/').then(mocked);
    Api.__setResponse('/foo/', 'bar');
    jest.runAllTimers();
    expect(mocked).toBeCalledWith('bar');
  });
});
