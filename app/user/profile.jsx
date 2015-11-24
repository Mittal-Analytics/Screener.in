"use strict";
var React = require('react');
var Link = require('react-router/lib/Link');
var Button = require('app/components/button.jsx');
var Api = require('../api.js');
var Utils = require('app/components/utils.js');
var Icon = require('app/components/icon.jsx');
var Alert = require('app/components/alerts.jsx');


var Profile = React.createClass({
  getInitialState: function() {
    return {
      form: {__html: '<h3>Loading...</h3>'},
      saved: false,
      errors: false,
    };
  },

  componentDidMount: function() {
    if(!window.loggedIn)
      return (window.location = '/register/');
    Utils.setTitle('Profile');
    var url = '/api/users/' + window.userId + '.html';
    Api.raw(url).then(function(response) {
      this.setState({
        form: {__html: response}
      });
    }.bind(this));
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var data = Utils.getFormData(this.refs.form);
    var url = ['users', window.userId];
    Api.patch(url, data).then(
      function(response) {
        this.setState({saved: true, errors: false});
      }.bind(this),
      function(response) {
        this.setState({errors: response, saved: false});
      }.bind(this)
    );
  },

  render: function() {
    var saved = this.state.saved && <h3>Changes Saved</h3>;
    return <div className="row">
        <div className="col-md-6 col-md-offset-3">
        <h2 className="page-header">My Account</h2>
        {saved}

        <p>
          <a
            className="btn btn-default"
            href="/password_change/">
            Change Password
          </a> <Link
            className="btn btn-info"
            to="/alerts/">
            Manage Email Alerts
          </Link>
        </p>

        <form onSubmit={this.handleSubmit} ref="form">
          <Alert errors={this.state.errors} />
          <input
            type="hidden"
            name="csrfmiddlewaretoken"
            value={Api.getCsrf()}
          />
          <div dangerouslySetInnerHTML={this.state.form} />
          <button
            className="btn btn-primary"
            onClick={this.handleSubmit}>
            <Icon name="floppy-disk" /> Save Changes
          </button>
        </form>
      </div>
    </div>;
  }
});


module.exports = Profile;
