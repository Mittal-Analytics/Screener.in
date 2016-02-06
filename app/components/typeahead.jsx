"use strict";
var React = require('react');
var debounce = require('lodash/debounce');
var classNames = require('classnames');
var TypeaheadMixin = require('./typeahead.mixin.jsx');


var Typeahead = React.createClass({

  mixins: [TypeaheadMixin],

  getInitialState: function() {
    return {
      index: -1,
      hideMenu: true
    };
  },

  getOptions: function() {
    return this.props.options;
  },

  handleChange: function() {
    var value = this.refs.input.value;
    if(value.length > 0)
      this.props.onChange(value);
    this.setState({hideMenu: false, index: 0});
  },

  handleSelect: function(index) {
    this.refs.input.value = '';
    this.hideMenu();
    this.props.onSelect(index);
  },

  render: function() {
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
});

module.exports = Typeahead;
