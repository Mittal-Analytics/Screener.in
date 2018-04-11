"use strict";
/* global document */
import React from 'react'
import Button from '../components/button.jsx'
import { Link } from 'react-router'
import api from '../api.js'
import {setTitle} from '../components/utils.js'


function SearchForm(props) {

  function handleSubmit(event) {
    event.preventDefault();
    var input = document.getElementById('screenSearch');
    props.onSubmit(input.value);
    input.value = '';
  }

  function clearSearch() {
    props.onSubmit(false);
  }

  function renderSearched() {
    return props.searched && <div>
      <hr />
      <h4>
        Showing results for: <i>{props.searched} </i>
        <small>
          <Button
            style="link"
            icon="remove"
            onClick={clearSearch}
            name="Clear"
          />
        </small>
      </h4>
    </div>;
  }

  return <div>
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          className="form-control input-lg"
          placeholder="Screen name"
          id="screenSearch" />
        <span className="input-group-btn">
          <button
            className="btn btn-primary btn-lg"
            type="submit">
            <i className="glyphicon glyphicon-search" />
            Search
          </button>
        </span>
      </div>
    </form>
    {renderSearched()}
  </div>;
}


var Screens = React.createClass({

  getInitialState: function() {
    return {
      searched: false,
      screens: {results: []}
    };
  },

  componentDidMount: function() {
    setTitle('Browse Screens');
    this._req = api.get(['screens', 'popular']).then(resp => {
      this.setState({
        screens: resp,
        searched: false
      });
    });
  },

  handleRecent: function() {
    api.get(['screens', 'recent']).then(function(response) {
      this.setState({
        screens: response,
        searched: false
      });
      setTitle('Latest Screens');
    }.bind(this));
  },

  handleSearch: function(searchTerm) {
    if(!searchTerm)
      return this.componentDidMount();
    var data = {q: searchTerm};
    api.get(['screens'], data).then(function(response) {
      this.setState({
        screens: response,
        searched: searchTerm
      });
      setTitle('Searched Screens');
    }.bind(this));
  },

  renderScreen: function(screen, idx) {
    return <div className="feed-item" key={idx}>
      <h4><Link to={screen.url}>{screen.name}</Link></h4>
      <p>{screen.description}</p>
    </div>;
  },

  render: function() {
    var screens = this.state.screens;
    return <div className="row">
      <div className="col-md-6 col-md-offset-3">
        <div className="page-header">
          <Button
            style="link"
            icon="hourglass"
            onClick={this.handleRecent}
            name="Show Latest Screens"
          />
          <SearchForm
            onSubmit={this.handleSearch}
            searched={this.state.searched} />
        </div>
        {screens.results.map(this.renderScreen)}
      </div>
    </div>;
  }
});


export default Screens
