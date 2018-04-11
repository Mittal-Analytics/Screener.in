"use strict";
import React from 'react'
import Typeahead from './typeahead.jsx'
import api from '../api.js'


var RatioSearch = React.createClass({
  propTypes: {
    onSelect: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      options: [],
      showLogin: false
    };
  },

  onChange: function(term) {
    if(!window.loggedIn)
      return this.setState({showLogin: true});
    this.req = api.get(api.ratioSearch, {q: term}).then(resp => {
      this.setState({options: resp});
    });
  },

  onSelect: function(idx) {
    var selected = this.state.options[idx];
    this.props.onSelect(selected);
  },

  render: function() {
    var login = false;
    if(this.state.showLogin) {
      login = <div className="alert alert-info">
        Please <a
          href="/register/"
          >login
        </a> to use this feature.
      </div>;
    }
    return <div className="dropdown">
      {login}
      <Typeahead
        placeholder={this.props.placeholder || 'Enter a ratio name'}
        options={this.state.options}
        onChange={this.onChange}
        onSelect={this.onSelect}
      />
    </div>;
  }
});

export default RatioSearch
