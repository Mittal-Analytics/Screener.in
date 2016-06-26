"use strict";
var React = require('react');
var Button = require('../components/button.jsx');
var Modal = require('../components/modal.jsx');
var Api = require('../api.js');
var Alerts = require('../components/alerts.jsx');
var utils = require('../components/utils.js');


var SaveScreenModal = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

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
    var data = utils.getFormData(this.refs.form);
    data.query = screen.query;
    data.latest = screen.latest;
    data.order = screen.order;
    data.sort = screen.sort;
    Api.post(['screens'], data).then(
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
