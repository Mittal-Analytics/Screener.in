"use strict";
import React from 'react'
import Button from '../components/button.jsx'
import Login from './login.jsx'


var Dialog = React.createClass({
  propTypes: {
    onOpen: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func.isRequired,
    children: React.PropTypes.node.isRequired,
    noFooter: React.PropTypes.bool,
  },

  componentDidMount: function() {
    document.body.className = 'modal-open';
    this.props.onOpen();
  },

  componentWillUnmount: function() {
    document.body.className = '';
    this.props.onClose();
  },

  render: function() {
    return <div className="modal fade in" style={{display: 'block'}}>
      <div className="modal-dialog">
        <div className="modal-content">
          {this.props.children}
        </div>
      </div>
    </div>;
  }
});


var Modal = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string.isRequired,
    style: React.PropTypes.string.isRequired,
    onOpen: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func.isRequired,
    children: React.PropTypes.element.isRequired,
  },

  getInitialState: function() {
    return {
      isOpen: false,
    };
  },

  handleNone: function() {},

  handleOpen: function() {
    this.setState({isOpen: true});
  },

  handleClose: function() {
    this.setState({isOpen: false});
  },

  render: function() {
    var dialog = this.state.isOpen && this.renderDialog();
    return <span>
      {dialog}
      <Button
        style={this.props.style}
        icon={this.props.icon}
        onClick={this.handleOpen}
        name={this.props.name} />
    </span>;
  },

  renderLoginDialog: function() {
    return <div>
      <Dialog onOpen={this.handleNone} onClose={this.handleNone}>
        <div className="modal-header">
          <button type="button" className="close" onClick={this.handleClose}>
            ×
          </button>
          <h3 className="modal-title">Please register to use this feature</h3>
        </div>
        <div className="modal-body">
          <Login />
        </div>
      </Dialog>
      <div className="modal-backdrop fade in" />
    </div>;
  },

  renderDialog: function() {
    if(!window.loggedIn)
      return this.renderLoginDialog();
    var title = this.props.title || this.props.name;
    var footer = <div className="modal-footer">
      <Button
        style="primary"
        onClick={this.handleClose}
        name="Close"/>
    </div>;
    if(this.props.noFooter)
      footer = <div />;
    return <div>
      <Dialog
        onOpen={this.props.onOpen}
        onClose={this.props.onClose}
        >
        <div className="modal-header">
          <button
            type="button"
            className="close"
            onClick={this.handleClose}>
            ×
          </button>
          <h3 className="modal-title">{title}</h3>
        </div>
        <div className="modal-body">
          {this.props.children}
        </div>
        {footer}
      </Dialog>
      <div className="modal-backdrop fade in" />
    </div>;
  },
});


export default Modal
