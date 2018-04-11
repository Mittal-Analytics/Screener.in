"use strict";
import React from 'react'
import { Link } from 'react-router'
import {scrollToTop, setTitle} from '../components/utils.js'
import Icon from '../components/icon.jsx'
import api from '../api.js'
import startCase from 'lodash/startCase'


function TalksHeader(props) {
  var active = startCase(props.tab);
  var alternates = {
    'top': '/talks/latest/',
    'latest': '/talks/',
    'Top': 'Latest',
    'Latest': 'Top'
  };
  var switchTab = <Link
    to={alternates[props.tab]}
    >Goto {alternates[active]} Links</Link>;
  return <h2 className="page-header">
    <Icon name="link"/> {active} Investing Talks
    <small> // {switchTab}</small>
    <span className="pull-right">
      <Link
        className="btn btn-info"
        to="/talks/submit/"
        >
        <i className="glyphicon glyphicon-plus" /> Add a Link
      </Link>
    </span>
  </h2>;
}


var Talks = React.createClass({

  getInitialState: function() {
    return {
      talks: false,
      votes: []
    };
  },

  componentDidMount: function() {
    this.fetchStats();
    this._req = this.fetchResults(this.props);
  },

  componentWillReceiveProps: function(props) {
    scrollToTop();
    return this.fetchResults(props);
  },

  fetchStats: function() {
    if(!window.loggedIn)
      return;
    api.get(['talks', 'voted']).then(function(response) {
      this.setState({votes: response});
    }.bind(this));
  },

  fetchResults: function(props) {
    var tab = props.params.tab || 'top';
    var page = props.location.query.page || 1;
    var data = {tab: tab, page: page};
    return api.get(['talks'], data).then(resp => {
      this.setState({talks: resp});
      var name = startCase(tab);
      setTitle(`${name} Talks`);
    });
  },

  handleVote: function(tid) {
    if(!window.loggedIn)
      return (window.location = '/register/');
    var url = ['talks', tid, 'vote_up'];
    api.post(url).then(function(response) {
      this.setState({votes: this.state.votes.concat([tid])});
    }.bind(this));
  },

  renderTalk: function(talk, idx) {
    var edit = (window.userId == talk.user) && <Link
      to={'/edit/'}>
      Edit
    </Link>;
    var vote = this.state.votes.indexOf(talk.id) > -1;
    if(vote)
      vote = <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>;
    else
      vote = <a onClick={this.handleVote.bind(null, talk.id)}>
        ⇡
      </a>;
    return <tr key={idx}>
      <td>{talk.votes} {vote}</td>
      <td className="text">
        <a href={talk.url} target="_blank">
          {talk.topic}
        </a> <span className="sub">
          //&nbsp;
          <span className="short_url">
            {talk.short_url}
          </span>
        </span>
      </td>
      <td>{edit}</td>
    </tr>;
  },

  render: function() {
    var talks = this.state.talks;
    var tab = this.props.params.tab || 'top';
    var curPage = this.props.location.query.page || 1;
    var nextPage = this.props.location.pathname + "?page=" + (++curPage);
    if(!talks)
      return <h3>Loading...</h3>;
    var showMore = talks.next && <Link
      to={nextPage}
      ><Icon name="chevron-right" /> Show more
    </Link>;
    return <div>
      <TalksHeader tab={tab} />
      <table className="table table-striped">
        <tbody>
          {talks.results.map(this.renderTalk)}
        </tbody>
      </table>
      <strong>{showMore}</strong>
    </div>;
  }
});


export default Talks
