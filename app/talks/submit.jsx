"use strict";
var React = require('react');
var Api = require('../api.js');
var Utils = require('app/components/utils.js');
var Alerts = require('app/components/alerts.jsx');
var Icon = require('app/components/icon.jsx');


function Header(props) {
  return <div>
    <h2 className="page-header">
      Add a Link
    </h2>
    <p>
      <b>What to Submit?</b> Anything that stock investors would find interesting (includes links to blog posts and articles).
    </p>
    <p>You can also <b>submit via bookmarklet: </b>
      <a
        className="btn btn-info"
        href="javascript:window.location=%22https://www.screener.in/talks/submit/?url=%22+encodeURIComponent(document.location)+%22&topic=%22+encodeURIComponent(document.title)"
        >
        <b>Talks</b>
      </a>
    </p>
    <p className="sub"><b>Please don't submit any restricted/confidential material</b>.</p>
  </div>;
}



var SubmitTalk = React.createClass({
  getInitialState: function() {
    return {
      form: {__html: '<h3>Loading</h3>'},
      errors: false,
    };
  },

  handleUrlVals: function() {
    for (var i = 0; i < this.refs.form.elements.length; i++) {
      var elem = this.refs.form.elements[i];
      var urlVal = this.props.location.query[elem.name];
      if(urlVal)
        elem.value = urlVal;
    }
  },

  componentDidMount: function() {
    if(!window.loggedIn)
      window.location = '/register/';
    Utils.setTitle('Submit Talk');
    Api.raw('/api/talks.html').then(function(response) {
      this.setState({
        form: {__html: response}
      }, this.handleUrlVals);
    }.bind(this));
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var data = Utils.getFormData(this.refs.form);
    Api.post(['talks'], data).then(
      function(response) {
        this.props.history.pushState(null, '/talks/latest/');
      }.bind(this),
      function(errors) {
        this.setState({errors: errors});
      }.bind(this)
    );
  },

  render: function() {
    var formCls = this.state.errors && 'has-error';
    return <div>
      <Header />
      <form
        className={formCls}
        onSubmit={this.handleSubmit}
        ref="form">
        <Alerts errors={this.state.errors} />
        <input
          type="hidden"
          name="csrfmiddlewaretoken"
          value={Api.getCsrf()}
        />
        <div dangerouslySetInnerHTML={this.state.form} />
        <button
          className="btn btn-primary"
          type="submit"
          >
          <Icon name="plus" /> Submit talk
        </button>
      </form>
    </div>;
  }
});


module.exports = SubmitTalk;
