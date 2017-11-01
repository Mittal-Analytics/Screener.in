"use strict";
jest.mock('fetch-on-rest');
import api from '../api.js'

describe('test REST apis', function () {

  beforeEach(() => {
    window.fetch.mockClear()
  })

  afterEach(() => {
    expect(api.getPending()).toEqual([]);
  });

  it('calls the post api', function() {
    api.setResponse('/logout/', JSON.stringify({}));
    return api.logout().then(() => {
      expect(window.fetch.mock.calls).toMatchSnapshot()
    });
  });

  it('calls the get api', function() {
    api.setResponse('/api/users/me/', JSON.stringify({foo: 'bar'}));
    return api.get(api.me).then(resp => {
      expect(resp).toEqual({foo: 'bar'});
      expect(window.fetch.mock.calls).toMatchSnapshot()
    })
  });

  it('calls the delete api', function() {
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
    expect(api._getUrl(api.me)).toEqual('/api/users/me/');
    expect(api._getUrl(api.me, {})).toEqual('/api/users/me/');
    expect(api._getUrl(api.me, {foo: 'bar'})).toEqual('/api/users/me/?foo=bar');
  });
});
