"use strict";
import React from 'react'
import api from '../api.js'
import {setTitle, getFormData} from '../components/utils.js'
import Alerts from '../components/alerts.jsx'
import Icon from '../components/icon.jsx'


function Header() {
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



class SubmitTalk extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      form: {__html: '<h3>Loading</h3>'},
      errors: false
    };
  }

  handleUrlVals() {
    for (var i = 0; i < this.refs.form.elements.length; i++) {
      var elem = this.refs.form.elements[i];
      var urlVal = this.props.location.query[elem.name];
      if(urlVal)
        elem.value = urlVal;
    }
  }

  componentDidMount() {
    if(!window.loggedIn)
      window.location = '/register/';
    setTitle('Submit Talk');
    return api.rawGet('/talks.html').then(resp => {
      this.setState({
        form: {__html: resp}
      }, this.handleUrlVals);
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var data = getFormData(this.refs.form);
    api.post(['talks'], data).then(
      function() {
        this.context.router.push('/talks/latest/');
      }.bind(this),
      function(errors) {
        this.setState({errors: errors});
      }.bind(this)
    );
  }

  render() {
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
          value={api.getCsrf()}
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
}

SubmitTalk.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default SubmitTalk
