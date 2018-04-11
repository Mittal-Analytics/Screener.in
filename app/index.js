"use strict";
import React from 'react'
import ReactDOM from 'react-dom'

import { Router } from 'react-router'
import { Route } from 'react-router'
import { browserHistory } from 'react-router'
import { IndexRoute } from 'react-router'

import { Navigation, Footer } from './base.jsx'
import Home from './home.jsx'
import Dash from './dash.jsx'
import CreateRatio from './ratios/create.jsx'
import EditRatio from './ratios/edit.jsx'
import DeleteRatio from './ratios/delete.jsx'
import Company from './company/company.jsx'
import Screens from './screens/screens.jsx'
import SavedScreen from './screens/saved.screen.jsx'
import Query from './screens/query.results.jsx'
import SubmitTalk from './talks/submit.jsx'
import Talks from './talks/talks.jsx'
import Watchlist from './watchlist.jsx'
import Profile from './user/profile.jsx'
import ManageAlerts from './user/manage.alerts.jsx'


function App(props) {
  return <div>
    <Navigation />
    <div className="container content">
      {props.children}
      <Footer />
    </div>
  </div>;
}


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="home/" component={Home} />
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
