"use strict";
var React = require('react');
var Api = require('../api.js');
var TypeaheadMixin = require('app/components/typeahead.mixin.jsx');
var debounce = require('lodash/function/debounce');
var getLastWord = require('./cursor.js');
var classNames = require('classnames');


function VariableDetail(props) {
  var selected = props.selected;
  var lead = selected ? selected.name : 'Custom Query Example';
  var example = <p>
    Price to earning &lt; 15 AND
    <br />
    Return on capital employed &gt; 22%
  </p>;
  var help = <a href="http://blog.screener.in/2012/07/creating-stock-screens/">
    Detailed guide on creating stock screens
  </a>;
  var unit = selected && <span>
    Value in: {selected.unit || "No unit"}
  </span>;
  var description = selected ? <p>{selected.description}</p> : example;
  help = selected ? unit : help;
  return <div className={props.className}>
    <p className="lead">{lead}</p>
    {description}
    <small>{help}</small>
  </div>;
}


var QueryBuilder = React.createClass({
  mixins: [TypeaheadMixin],

  getInitialState: function() {
    return {
      options: [],
      lastWord: '',
      cursorPos: 0,
      index: -1,
      hideMenu: true,
      selected: false
    };
  },

  getOptions: function() {
    return this.state.options;
  },

  getDisplayVal: function(item) {
    return item.name;
  },

  insertThis: function(replacor, replacee) {
    var fullVal = this.refs.input.value;
    var tillCursor = fullVal.substring(0, this.state.cursorPos);
    var insertPos = tillCursor.lastIndexOf(replacee);
    if (insertPos == -1)
      return;
    var before = fullVal.substring(0, insertPos);
    var after = fullVal.substring(this.state.cursorPos);
    var newVal = before + replacor + after;
    var newPos = newVal.length - after.length;
    this.refs.input.value = newVal;
    this.refs.input.selectionStart = newPos;
    this.refs.input.selectionEnd = newPos;
    this.hideMenu();
  },

  fetchOptions: function(word) {
    Api.get(['ratios', 'search'], {q: word}).then(function(response) {
      this.setState({options: response});
    }.bind(this));
  },

  handleChange: function() {
    var cursorPos = this.refs.input.selectionStart;
    var fullVal = this.refs.input.value;
    var tillCursor = fullVal.substring(0, cursorPos);
    var lastWord = getLastWord(tillCursor).trim();
    this.setState({
      lastWord: lastWord,
      cursorPos: cursorPos
    });
    if(lastWord.length >= 2) {
      this.fetchOptions(lastWord);
      this.setState({
        hideMenu: false,
        index: 0
      });
    } else {
      this.hideMenu();
    }
  },

  handleSelect: function(index) {
    var selected = this.state.options[index];
    this.setState({selected: selected});
    var displayVal = this.getDisplayVal(selected) + ' ';
    this.insertThis(displayVal, this.state.lastWord);
  },

  renderOptions: function() {
    var options = this.state.options.map(function(option, idx) {
      return (
        <li key={idx}
            onClick={this.handleSelect.bind(null, idx)}
            className={idx == this.state.index ? 'active' : ''}>
          <a>{this.getDisplayVal(option)}</a>
        </li>
      );
    }, this);
    return options;
  },

  render: function() {
    var opLen = this.state.options.length;
    var queryError = this.props.error && <span className="help-block">
      {this.props.error}
    </span>;
    var classes = classNames('col-md-8 dropdown', {
      'open': opLen > 0 && !this.state.hideMenu,
      'has-error': queryError
    });
    return <form method="get" action="/screen/raw/">
      <h3>Query Builder</h3>
      <p>You can customize the query below:</p>
      <div className="row">
        <div className={classes}>
          <textarea
            autoComplete="off"
            spellCheck="false"
            required
            onKeyDown={this.handleKeyDown}
            onChange={debounce(this.handleChange, 120)}
            onBlur={this.handleBlur}
            placeholder="eg. Book value > Current price"
            defaultValue={this.props.defaults.query}
            className="form-control"
            rows="7"
            ref="input"
            name="query"
          />
          {queryError}
          <ul className="dropdown-menu">
            {this.renderOptions()}
          </ul>
        </div>
        <VariableDetail
          selected={this.state.selected}
          className="callout callout-info col-md-4"
        />
      </div>
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            name="latest"
            value="true"
            defaultChecked={this.props.defaults.latest} />
          Show only latest results?
        </label>
      </div>
      <button className="btn btn-primary" type="submit">
        <i className="glyphicon glyphicon-send"/> Run this query
      </button>
    </form>;
  }
});

module.exports = QueryBuilder;
