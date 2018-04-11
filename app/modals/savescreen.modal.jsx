"use strict";
import React from 'react'
import classNames from 'classnames'
import Button from '../components/button.jsx'
import Modal from '../components/modal.jsx'
import Api from '../api.js'
import Alerts from '../components/alerts.jsx'
import {getFormData} from '../components/utils.js'


var SaveScreenModal = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  propTypes: {
    screen: React.PropTypes.object.isRequired,
    update: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      form: {__html: '<h3>Loading...</h3>'},
      errors: false
    };
  },

  onOpen: function() {
    var uid = this.props.update
    var url = uid ? 'screens/' + uid + '.html' : 'screens.html'
    return Api.rawGet(url).then(resp => {
      this.setState({
        form: {__html: resp}
      });
    });
  },

  onClose: function() {},

  handleSubmit: function(uid) {
    var screen = this.props.screen;
    var data = getFormData(this.refs.form);
    data.query = screen.query;
    data.latest = screen.latest;
    data.order = screen.order;
    data.sort = screen.sort;

    var save = uid ? 'put' : 'post'
    var url = uid ? ['screens', uid] : ['screens']
    this._req = Api[save](url, data).then(
      function(response) {
        this.context.router.push(response.url);
      }.bind(this),
      function(errors) {
        this.setState({errors: errors});
      }.bind(this));
  },

  handleCancel: function() {
    this.refs.modal.handleClose();
  },

  render: function() {
    var btnCls = classNames('btn', this.props.update ? 'btn-link' : 'btn-primary')
    var btnText = this.props.update ? 'Save as new screen' : <span>
      <i className="glyphicon glyphicon-save" /> Save
    </span>
    var createNewBtn = <a onClick={() => this.handleSubmit()} className={btnCls}>
      {btnText}
    </a>
    var updateBtn = this.props.update && <a
      onClick={() => this.handleSubmit(this.props.update)}
      className="btn btn-primary">
      <i className="glyphicon glyphicon-save" /> Save Changes
    </a>

    return <Modal
      onOpen={this.onOpen}
      onClose={this.onClose}
      style="success"
      icon="bookmark"
      name="Save this screen"
      ref="modal"
      noFooter={true}
      >
      <form
        onSubmit={event => event.preventDefault() || this.handleSubmit(this.props.update)}
        ref="form"
        className={this.state.errors && 'has-error'}
        >
        <Alerts errors={this.state.errors} />
        <input
          type="hidden"
          name="csrfmiddlewaretoken"
          value={Api.getCsrf()}
        />
        <div dangerouslySetInnerHTML={this.state.form} />
        <hr />
        <div className="pull-right">
          {createNewBtn} {updateBtn}
        </div>
        <Button
          style="danger"
          icon="remove"
          onClick={this.handleCancel}
          name="Cancel"/>
      </form>
    </Modal>;
  }

});

export default SaveScreenModal
