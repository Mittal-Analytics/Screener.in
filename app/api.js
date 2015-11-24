"use strict";
/* global require, document, window */
var URITemplate = require('urijs/src/URITemplate');

function parseJson(response) {
  if(response.status == 204)
    return;
  return response.json().then(function(json) {
    if (response.status >= 200 && response.status < 300) {
      return json;
    } else {
      var error = new Error(response.statusText);
      error.json = json;
      throw error;
    }
  });
}

function getCookie(sKey) {
  if (!sKey) { return ''; }
  return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || '';
}

function getOptions(data, method, html) {
  var options = {
    credentials: 'same-origin',
    headers: {},
  };
  if(!html)
    options.headers.Accept = 'application/json';
  else
    options.headers.Accept = 'text/html,*/*';

  if(method !== undefined) {
    options.headers['X-CSRFToken'] = getCookie('csrftoken');
    options.method = method;
    if(data !== undefined) {
      options.body = JSON.stringify(data);
      options.headers['Content-Type'] = 'application/json';
    }
  }
  return options;
}



var Api = {
  base: new URITemplate('/api{/paths*}/{?params*}'),

  parse: function(paths, params) {
    var template = new URITemplate('{/paths*}/{?params*}');
    return template.expand({paths: paths, params: params});
  },

  request: function(paths, params, data, method, html) {
    var url;
    if(paths instanceof Array) {
      url = this.base.expand({paths: paths, params: params});
    } else {
      url = paths;
    }
    var options = getOptions(data, method, html);
    var raw = window.fetch(url, options);
    if(!html) {
      return raw.then(parseJson);
    }
    return raw.then(function(response) {
      return response.text();
    });
  },

  raw: function(paths, params) {
    var data, method;
    var html = true;
    return this.request(paths, params, data, method, html);
  },

  get: function(paths, params) {
    return this.request(paths, params);
  },

  post: function(paths, data) {
    return this.request(paths, {}, data, 'post');
  },

  put: function(paths, data) {
    return this.request(paths, {}, data, 'put');
  },

  patch: function(paths, data) {
    return this.request(paths, {}, data, 'patch');
  },

  delete: function(paths, data) {
    return this.request(paths, {}, data, 'delete');
  },

  getCsrf: function() {
    return getCookie('csrftoken');
  },

  me: ['users', 'me'],
  my: function(resource) {
    return ['users', resource];
  },
  logout: '/logout/',
  search: ['company', 'search'],
  ratioSearch: ['ratios', 'search'],
  company: function(exchange_code, consolidated) {
    var paths = ['company', exchange_code];
    if (consolidated)
      paths.push('consolidated');
    return paths;
  },
  cid: function(cid, component) {
    return ['company', cid, component];
  }
};

module.exports = Api;
