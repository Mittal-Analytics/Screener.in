"use strict";
/* global require, window, jest */

jest.dontMock('urijs/src/URITemplate');

describe('test REST apis', function () {
  var Api;
  beforeEach(function() {
    Api = require.requireActual('../api.js');
    window.fetch = jest.genMockFunction().mockReturnValue({
      then: jest.genMockFunction()
    });
  });

  it('calls the get api', function() {
    Api.get(Api.me);
    expect(window.fetch).toBeCalledWith(
      '/api/users/me/',
      { credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
        }
      }
    );
  });

  it('calls the post api', function() {
    Api.post(Api.logout, {foo: 'bar'});
    expect(window.fetch).toBeCalledWith(
      '/logout/',
      { body: '{"foo":"bar"}',
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          "Content-Type": 'application/json',
          'X-CSRFToken': ''
        },
        method: 'post'
      }
    );
  });

  it('calls the delete api', function() {
    Api.delete(['screens', 33], {foo: 'bar'});
    expect(window.fetch).toBeCalledWith(
      '/api/screens/33/',
      { body: '{"foo":"bar"}',
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          "Content-Type": 'application/json',
          'X-CSRFToken': ''
        },
        method: 'delete'
      }
    );
  });

  it('calls the post api with empty data', function() {
    Api.post(Api.logout);
    expect(window.fetch).toBeCalledWith(
      '/logout/',
      { credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'X-CSRFToken': ''
        },
        method: 'post'
      }
    );
  });
});


describe('test dependent libraries', function(){
  it('checks polyfill', function() {
    window.fetch = undefined;
    expect(window.fetch).toEqual(undefined);
    require('whatwg-fetch');
    expect(window.fetch).toBeDefined();
  });

  it('checks expansions', function() {
    var Api = require.requireActual('../api.js');
    var base = Api.base;
    var paths = {paths: ['users', 'me'], params: undefined};
    expect(base.expand(paths)).toEqual('/api/users/me/');
    paths = {paths: ['users', 'me']};
    expect(base.expand(paths)).toEqual('/api/users/me/');
    paths = {paths: ['users', 'me'], params: {foo: 'bar'}};
    expect(base.expand(paths)).toEqual('/api/users/me/?foo=bar');
  });
});
