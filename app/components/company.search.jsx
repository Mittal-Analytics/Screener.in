"use strict";
/* global require, window */
var React = require('react');
var classNames = require('classnames');
var Api = require('../api.js');
var Typeahead = require('./typeahead.jsx');
var Icon = require('./icon.jsx');


var CompanySearch = React.createClass({
  propTypes: {
    onSelect: React.PropTypes.func.isRequired,
    large: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
  },

  getInitialState: function() {
    return {options: []};
  },

  onChange: function(term) {
    Api.get(Api.search, {q: term})
      .then(function(response){
        this.setState({options: response});
      }.bind(this));
  },

  onSelect: function(idx) {
    var selected = this.state.options[idx];
    this.props.onSelect(selected);
  },

  render: function() {
    var buttonClass = classNames(
      'btn btn-primary',
      this.props.large && 'btn-lg'
    );
    return <div className="input-group">
      <Typeahead
        className={this.props.large && "input-lg"}
        placeholder={this.props.placeholder || 'Enter a company name here'}
        options={this.state.options}
        onChange={this.onChange}
        onSelect={this.onSelect} />
      <span className="input-group-btn">
        <button className={buttonClass}>
          <Icon name="search" />
          <span className="hidden-sm hidden-xs"> Search</span>
        </button>
      </span>
    </div>;
  }
});

module.exports = CompanySearch;
