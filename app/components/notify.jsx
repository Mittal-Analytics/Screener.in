"use strict";
import React from 'react'
import Button from './button.jsx'

class Confirm extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {status: 'initial'};
  }

  handleClick() {
    this.setState({status: 'pending'});
    // assigning to req for testing
    this.req = this.props.onClick().then(
      () => this.setState({status: 'done'}),
      () => this.setState({status: 'failed'})
    );
  }

  render() {
    var name = this.props.name;
    var disabled = false;
    var style = this.props.style || 'info';
    var icon = this.props.icon;
    switch (this.state.status) {
      case 'pending':
        name = 'Processing...';
        disabled = true;
        break;
      case 'failed':
        name = 'Failed! Retry?';
        style = 'warning';
        disabled = false;
        break;
      case 'done':
        name = 'Done';
        style = 'link';
        icon = 'ok';
        disabled = true;
        break;
    }
    return <Button
      style={style}
      icon={icon}
      onClick={this.handleClick.bind(this)}
      name={name}
      disabled={disabled}/>;
  }
}

Confirm.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  style: React.PropTypes.string,
  icon: React.PropTypes.string,
  name: React.PropTypes.string.isRequired
};

export default Confirm
