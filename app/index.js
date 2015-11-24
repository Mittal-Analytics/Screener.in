"use strict";
/* global require, document, window */

var React = require('react');
var ReactDOM = require('react-dom');

var createBrowserHistory = require('history/lib/createBrowserHistory');
var IndexRoute = require('react-router/lib/IndexRoute');
var Router = require('react-router/lib/Router');
var Route = require('react-router/lib/Route');

var Base = require('./base.jsx');
var Home = require('./home.jsx');
var Dash = require('./dash.jsx');
var Company = require('./company/company.jsx');
var Screens = require('./screens/screens.jsx');
var SavedScreen = require('./screens/saved.screen.jsx');
var Query = require('./screens/query.jsx');
var SubmitTalk = require('./talks/submit.jsx');
var Talks = require('./talks/talks.jsx');
var Watchlist = require('./watchlist.jsx');
var Profile = require('./user/profile.jsx');
var ManageAlerts = require('./user/manage.alerts.jsx');


var App = React.createClass({
  render: function() {
    return (
      <div>
        <Base.Navigation />
        <div className="container content">
          {this.props.children}
          <Base.Footer />
        </div>
      </div>
    );
  }
});

var Server = React.createClass({
  render: function() {
    return <div></div>;
  }
});

ReactDOM.render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="dash/" component={Dash} />
      <Route path="screen/raw/" component={Query} />
      <Route path="screens/" component={Screens} />
      <Route path="screens/:screenId/:screenName/" component={SavedScreen} />
      <Route path="company/:exchange_code(/:consolidated)" component={Company} />
      <Route path="talks/submit/" component={SubmitTalk} />
      <Route path="talks/(:tab/)" component={Talks} />
      <Route path="watchlist/" component={Watchlist} />
      <Route path="account/" component={Profile} />
      <Route path="alerts/" component={ManageAlerts} />
    </Route>
  </Router>
), document.getElementById('content'));
