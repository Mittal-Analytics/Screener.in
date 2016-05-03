"use strict";
var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var IndexRoute = require('react-router').IndexRoute;

var Base = require('./base.jsx');
var Home = require('./home.jsx');
var Dash = require('./dash.jsx');
var CreateRatio = require('./ratios/create.jsx');
var EditRatio = require('./ratios/edit.jsx');
var DeleteRatio = require('./ratios/delete.jsx');
var Company = require('./company/company.jsx');
var Screens = require('./screens/screens.jsx');
var SavedScreen = require('./screens/saved.screen.jsx');
var Query = require('./screens/query.results.jsx');
var SubmitTalk = require('./talks/submit.jsx');
var Talks = require('./talks/talks.jsx');
var Watchlist = require('./watchlist.jsx');
var Profile = require('./user/profile.jsx');
var ManageAlerts = require('./user/manage.alerts.jsx');


function App(props) {
  return <div>
    <Base.Navigation />
    <div className="container content">
      {props.children}
      <Base.Footer />
    </div>
  </div>;
}


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="dash/" component={Dash} />
      <Route path="ratios/" component={CreateRatio} />
      <Route path="ratios/:ratioId/" component={EditRatio} />
      <Route path="ratios/:ratioId/delete/" component={DeleteRatio} />
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
