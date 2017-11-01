"use strict";
import React from 'react';
import debounce from 'lodash/debounce'
import classNames from 'classnames'
import TypeUtil from './typeahead.util.js'


class Typeahead extends React.Component {

  constructor(props, context) {
    super(props, context);
    // TypeaheadUtil defaults
    this.handleKeyDown = TypeUtil.handleKeyDown.bind(this);
    this.handleBlur = TypeUtil.handleBlur.bind(this);
    this.hideMenu = TypeUtil.hideMenu.bind(this);
    this.handleUnmount = TypeUtil.handleUnmount.bind(this);
    // End TypeaheadUtil defaults
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      index: -1,
      hideMenu: true
    };
  }

  componentWillUnmount() {
    this.handleUnmount();
  }

  getOptions() {
    return this.props.options;
  }

  handleChange() {
    var value = this.refs.input.value;
    if(value.length > 0)
      this.props.onChange(value);
    this.setState({hideMenu: false, index: 0});
  }

  handleSelect(index) {
    this.refs.input.value = '';
    this.hideMenu();
    this.props.onSelect(index);
  }

  render() {
    var options = this.props.options.map(function(option, idx) {
      return <li
        key={option.id || idx}
        onClick={this.handleSelect.bind(null, idx)}
        className={idx == this.state.index ? 'active' : ''}>
          <a>{option.name}</a>
      </li>;
    }, this);

    var opLen = this.props.options.length;
    var classes = classNames({
      'open': opLen > 0 && !this.state.hideMenu
    });

    return (
      <div className={classes}>
        <input
          autoComplete="off"
          spellCheck="false"
          onKeyDown={this.handleKeyDown}
          onChange={debounce(this.handleChange, 120)}
          onBlur={this.handleBlur}
          placeholder={this.props.placeholder}
          className={classNames('form-control', this.props.className)}
          ref="input"
        />
        <ul className="dropdown-menu">
          {options}
        </ul>
      </div>
    );
  }
}

Typeahead.propTypes = {
  options: React.PropTypes.array.isRequired,
  onSelect: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  className: React.PropTypes.string
}

export default Typeahead
