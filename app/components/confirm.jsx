"use strict";
import React from 'react'
import classNames from 'classnames'
import Button from './button.jsx'


class Confirm extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {showConfirm: false};
    this.handleShowConfirm = this.handleShowConfirm.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleShowConfirm() {
    this.setState({showConfirm: true});
  }

  handleConfirm() {
    this.setState({showConfirm: false});
    this.props.onClick();
  }

  handleCancel() {
    this.setState({showConfirm: false});
  }

  render() {
    var part1cls = classNames({hide: this.state.showConfirm});
    var part2cls = classNames({hide: !this.state.showConfirm});
    var icon = this.props.icon || "trash";
    return <span>
      <span className={part1cls}>
        <Button
          style={this.props.style || "danger"}
          icon={icon}
          onClick={this.handleShowConfirm}
          name={this.props.name}
        />
      </span>
      <span className={part2cls}>
        <strong>Sure?</strong> <Button
          style="danger"
          onClick={this.handleConfirm}
          name="Yes"
        /> <Button
          style="link"
          onClick={this.handleCancel}
          name="Cancel"
        />
      </span>
    </span>;
  }
}

Confirm.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  style: React.PropTypes.string,
  icon: React.PropTypes.string,
  name: React.PropTypes.string.isRequired
};

export default Confirm
