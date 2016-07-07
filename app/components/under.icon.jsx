"use strict";
import React from 'react'
import Icon from './icon.jsx'

class UnderIcon extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isClicked: false
    }
  }

  render() {
    var innerContent = this.state.isClicked && this.props.children
    var iconClass = this.state.isClicked ? 'hide' : ''
    return <div>
      {innerContent}
      <div
        className={iconClass}
        onClick={() => this.setState({isClicked: true})}>
        <Icon name={this.props.icon} />
      </div>
    </div>
  }
}

UnderIcon.propTypes = {
  children: React.PropTypes.element.isRequired,
  icon: React.PropTypes.string.isRequired
}

module.exports = UnderIcon
