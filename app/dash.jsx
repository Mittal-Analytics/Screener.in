import React from 'react'
import WatchlistButton from './modals/watchlist.button.jsx'
import QueryForm from './screens/query.form.jsx'
import {Link} from 'react-router'
import {setTitle} from './components/utils.js'
import Api from './api.js'


var Feeds = React.createClass({
  getInitialState: function() {
    return {feed: {results: []}};
  },

  componentDidMount: function() {
    this.limit = 18;
    this.fetchFeeds();
  },

  loadMore: function() {
    this.limit += 25;
    this.fetchFeeds();
  },

  fetchFeeds: function() {
    Api.get(Api.my('feed'), {limit: this.limit}).then(function(response) {
      this.setState({feed: response});
    }.bind(this));
  },

  renderEmpty: function() {
    return <div className="jumbotron">
      <h3>Build Your Watchlist</h3>
      <p className="lead">
        Add companies to your watchlist to
        <strong> stay updated </strong> about their latest
        <strong> results, reports and announcements.</strong>
      </p>
      <WatchlistButton
        onClose={this.props.handleWatchlistChange}
        style="info"
      />
    </div>;
  },

  render: function() {
    var rows = this.state.feed.results;
    var total = this.state.feed.count;
    if(rows.length === 0)
      return this.renderEmpty();
    rows = rows.map(function(row, idx) {
      return <div className="feed-item" key={idx}>
        <Link to={row.company_url}>
          {row.company}
        </Link> {row.verb} <a href={row.object_url}>
          {row.title}
        </a> <small className="sub">{row.timesince} ago</small>
      </div>;
    });

    var showMore = false;
    if(total > rows.length) {
      showMore = <button className="btn btn-default btn-block"
        onClick={this.loadMore}>
        Show more
      </button>;
    }

    return <div>
      {rows}
      <hr />
      {showMore}
    </div>;
  }
});


var UpcomingResults = React.createClass({
  getInitialState: function() {
    return {
      upcoming: []
    };
  },

  componentDidMount: function() {
    Api.get(Api.my('upcoming')).then(function(response) {
      this.setState({upcoming: response});
    }.bind(this));
  },

  render: function() {
    var results = this.state.upcoming;
    if(results.length === 0)
      return <div></div>;
    var rows = results.map(function(result, idx) {
      return <li className="list-group-item" key={idx}>
        <Link to={result.url}>{result.short_name}</Link>
        : {result.result_date}
      </li>;
    });
    return <div className="panel panel-primary" >
      <div className="panel-heading">Upcoming Results</div>
      <ul className="list-group">{rows}</ul>
    </div>;
  }
});


var UserScreens = React.createClass({
  getInitialState: function() {
    return {screens: {results: [], count: 0}};
  },

  componentDidMount: function() {
    this.limit = 15;
    this.fetchScreens();
  },

  fetchAllScreens: function() {
    this.limit = 100;
    this.fetchScreens();
  },

  fetchScreens: function() {
    Api.get(['screens'], {user: '', limit: this.limit})
      .then(function(response) {
        this.setState({screens: response});
      }.bind(this));
  },

  render: function() {
    var screens = this.state.screens.results;
    var total = this.state.screens.count;
    if(screens.length === 0)
      return false;

    var rows = screens.map(function(screen, idx) {
      return <li className="list-group-item" key={idx}>
        <Link to={screen.url}>{screen.name}</Link>
      </li>;
    });

    var showMore = false;
    if(total > screens.length) {
      showMore = <div className="panel-footer">
        <button className="btn btn-block btn-default"
          onClick={this.fetchAllScreens}>
          Show more
        </button>
      </div>;
    }

    return <div className="panel panel-primary">
      <div className="panel-heading">
        Your Screens <span className="badge">{total}</span>
      </div>
      <ul className="list-group">{rows}</ul>
      {showMore}
    </div>;
  }
});


var PopularScreens = React.createClass({
  getInitialState: function() {
    return {popular: {results: []}};
  },

  componentDidMount: function() {
    Api.get(['screens', 'popular'], {limit: 5}).then(function(response) {
      this.setState({popular: response});
    }.bind(this));
  },

  render: function() {
    var popular = this.state.popular.results;
    var rows = popular.map(function(screen, idx) {
      return <li className="list-group-item" key={idx}>
        <Link to={screen.url}>{screen.name}</Link>
      </li>;
    });
    return <div className="panel panel-default">
      <div className="panel-heading">
        Popular Screens
      </div>
      <ul className="list-group">{rows}</ul>
      <div className="panel-footer">
        <a className="btn btn-block btn-default" href="/screens/">
          Browse all screens
        </a>
      </div>
    </div>;
  }
});


var Dash = React.createClass({
  componentDidMount: function() {
    setTitle('Dashboard');
  },

  handleWatchlistChange: function() {
    window.location.reload();
  },

  render: function() {
    return <div>
      <div className="page-header">
        <div className="pull-right">
          <WatchlistButton
            style="info"
            onClose={this.handleWatchlistChange} />
          &nbsp;
          <Link
            to="/watchlist/"
            className="btn btn-primary"
            >
            <i className="glyphicon glyphicon-star"></i> Watchlist
          </Link>
        </div>
        <h2>News Feed</h2>
      </div>
      <div className="row">
        <div className="col-md-9">
          <Feeds handleWatchlistChange={this.handleWatchlistChange} />
        </div>
        <div className="col-md-3">
          <UpcomingResults />
          <UserScreens />
          <PopularScreens />
        </div>
      </div>
      <section>
        <QueryForm defaults={{}} />
      </section>
    </div>;
  }
});

export default Dash
