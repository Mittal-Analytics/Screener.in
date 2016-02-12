"use strict";
jest.autoMockOff();
jest.mock('fetch-on-rest');

describe('test REST apis', function () {
  var api = require('app/api.js');

  afterEach(function() {
    expect(api.getPending()).toEqual([]);
  });

  pit('calls the get api', function() {
    api.setResponse('/api/users/me/', JSON.stringify({foo: 'bar'}));
    return api.get(api.me).then(resp => {
      expect(resp).toEqual({foo: 'bar'});
      expect(window.fetch.mock.calls.length).toBe(1);
      expect(window.fetch.mock.calls[0][0]).toEqual('/api/users/me/');
      var headers = {
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json'
        },
        method: 'get'
      };
      expect(window.fetch.mock.calls[0][1]).toEqual(headers);
    })
  });

  pit('calls the post api', function() {
    api.setResponse('/logout/', JSON.stringify({}));
    return api.logout().then(() => {
      expect(window.fetch.mock.calls.length).toBe(1);
      expect(window.fetch.mock.calls[0][0]).toEqual('/logout/');
      var headers = {
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'X-CSRFToken': ''
        },
        method: 'post'
      };
      expect(window.fetch.mock.calls[0][1]).toEqual(headers);
    });
  });

  pit('calls the delete api', function() {
    api.setResponse('/api/screens/33/?foo=bar', "{}");
    return api.delete(['screens', 33], {foo: 'bar'}).then(() => {
      expect(window.fetch).toBeCalledWith(
        '/api/screens/33/?foo=bar',
        { credentials: 'same-origin',
          headers: {
            Accept: 'application/json',
            'X-CSRFToken': ''
          },
          method: 'delete'
        }
      );
    });
  });

});


describe('test dependent libraries', function(){
  it('checks expansions', function() {
    var api = require('app/api.js');
    expect(api._getUrl(api.me)).toEqual('/api/users/me/');
    expect(api._getUrl(api.me, {})).toEqual('/api/users/me/');
    expect(api._getUrl(api.me, {foo: 'bar'})).toEqual('/api/users/me/?foo=bar');
  });
});
