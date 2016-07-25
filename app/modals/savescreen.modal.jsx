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
      isOwner: true,
      savedScreen: undefined,
      errors: false
    };
  },

  onOpen: function() {
    var screenId = this.props.update;
    if (screenId) {
      Api.get(['screens', screenId]).then(resp => {
        this.setState({
          isOwner: resp.is_owner,
          savedScreen: resp.is_owner ? resp : undefined
        });
      });
    }

    return Api.rawGet('screens.html').then(resp => {
      this.setState({
        form: {__html: resp}
      });

      if (screenId) {
        this.updateForm();
      }
    });
  },

  onClose: function() {},

  updateScreen: function(event) {
    event.preventDefault();
    var screen = this.props.screen;
    var data = utils.getFormData(this.refs.form);
    data.query = screen.query;
    data.latest = screen.latest;
    data.order = screen.order;
    data.sort = screen.sort;

    data.id = this.state.savedScreen.id;
    var url = 'screens/' + data.id;
    Api.put([url], data).then(
      function(response) {
        this.context.router.push(response.url);
      }.bind(this),
      function(errors) {
        this.setState({errors: errors});
      }.bind(this));
  },

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

  updateFields: function() {
    if(this.state.savedScreen) {
      this.refs.form.name.value = this.state.savedScreen.name;
      this.refs.form.description.value = this.state.savedScreen.description;
    } else if (this.state.isOwner) {
      this.updateForm();
    }
  },

  updateForm: function() {
    setTimeout( () => this.updateFields(), 200);
  },

  handleCancel: function() {
    this.refs.modal.handleClose();
  },

  render: function() {
    var formCls = this.state.errors && 'has-error';

    var txtSaveBtn = this.state.savedScreen === undefined ? 'Save' : 'Save as new screen';
    var updateBtn;
    if(this.state.savedScreen) {
      updateBtn = <button type="submit" onClick={this.updateScreen} className="btn btn-primary">
            <i className="glyphicon glyphicon-save" /> 'Overwrite {this.state.savedScreen.name}'
          </button>;
    }

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
          <div className="pull-right">
            &nbsp;&nbsp;
            <button type="submit" className="btn btn-primary">
              <i className="glyphicon glyphicon-save" /> {txtSaveBtn}
            </button>
          </div>
          {updateBtn}
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
