"use strict";
import React from 'react'
import Api from '../api.js'

function Login(props) {
  return <form method="post" action="/register/">
    <fieldset>
      <legend>Free Investor Registration</legend>
      <input
        type="hidden"
        name="csrfmiddlewaretoken"
        value={Api.getCsrf()}
      />
      <div className="form-group">
        <label
          className="control-label"
          htmlFor="id_email">
          Email
        </label>
        <input
          className="form-control"
          id="id_email"
          name="email"
          type="email"
        />
      </div>

      <div className="form-group">
        <label
          className="control-label"
          htmlFor="id_email2">
          Re-enter Email
        </label>
        <input
          className="form-control"
          id="id_email2"
          name="email2"
          type="email"
        />
        <p className="help-block">
          We promise we won't spam
        </p>
      </div>

      <div className="form-group">
        <label
          className="control-label"
          htmlFor="id_password">
          Password
        </label>
        <input
          className="form-control"
          id="id_password"
          name="password"
          type="password"
        />
      </div>

      <div className="form-group">
        <button type="submit" className="btn btn-primary">
          <i className="glyphicon glyphicon-user" /> Register
        </button>
      </div>

      <div>
        <p>
          Already registered? <a href="/login/">Login here</a>.
        </p>
      </div>
    </fieldset>
  </form>;
}

export default Login
