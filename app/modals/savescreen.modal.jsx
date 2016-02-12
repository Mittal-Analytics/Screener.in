"use strict";
/* global require */
var React = require('react');
var History = require('react-router/lib/History');
var Button = require('app/components/button.jsx');
var Modal = require('app/components/modal.jsx');
var Api = require('../api.js');
var Alerts = require('app/components/alerts.jsx');


var SaveScreenModal = React.createClass({
  mixins: [History],

  propTypes: {
    screen: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      form: {__html: '<h3>Loading...</h3>'},
      errors: false
    };
  },

  onOpen: function() {
    return Api.rawGet('screens.html').then(resp => {
      this.setState({
        form: {__html: resp}
      });
    });
  },

  onClose: function() {},

  handleSubmit: function(event) {
    event.preventDefault();
    var screen = this.props.screen;
    var data = {};
    for (var i = 0; i < this.refs.form.elements.length; i++) {
      var elem = this.refs.form.elements[i];
      data[elem.name] = elem.value;
    }
    data.query = screen.query;
    data.latest = screen.latest;
    data.order = screen.order;
    data.sort = screen.sort;
    Api.post(['screens'], data).then(
      function(response) {
        this.history.pushState(null, response.url);
      }.bind(this),
      function(errors) {
        this.setState({errors: errors});
      }.bind(this));
  },

  handleCancel: function() {
    this.refs.modal.handleClose();
  },

  render: function() {
    var formCls = this.state.errors && 'has-error';
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
        onSubmit={this.handleSubmit}
        ref="form"
        className={formCls}
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
          <button type="submit" className="btn btn-primary">
            <i className="glyphicon glyphicon-save" /> Save
          </button>
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

module.exports = SaveScreenModal;
