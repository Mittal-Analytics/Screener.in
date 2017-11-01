"use strict";
import React from 'react'
import api from '../api.js'
import ActionRows from '../modals/action.rows.jsx'
import {setTitle} from '../components/utils.js'
import Button from '../components/button.jsx'


class Alerts extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleWatchlistToggle = this.handleWatchlistToggle.bind(this);
    this.state = {
      screens: false,
      watchlistAlert: true
    };
  }

  componentDidMount() {
    if(!window.loggedIn)
      return (window.location = '/register/');
    setTitle('Manage Alerts');
    api.get(['alerts']).then(resp => {
      this.setState({screens: resp});
    });
    this._req = api.get(['users', 'me']).then(resp => {
      this.setState({
        watchlistAlert: resp.watchlist_alert
      });
    });
  }

  getDisplayName(item) {
    return item.name;
  }

  handleRemove(item) {
    return api.delete(['alerts', item.id]);
  }

  handleWatchlistToggle() {
    var newValue = !this.state.watchlistAlert;
    var url = ['users', window.userId];
    var data = {watchlist_alert: newValue};
    return api.patch(url, data).then(() => {
      this.setState({watchlistAlert: newValue});
    });
  }

  render() {
    var current, toggle, btnCls, actions;
    if(this.state.watchlistAlert) {
      current = 'Enabled';
      toggle = 'Disable';
      btnCls = 'danger';
    } else {
      current = 'Disabled';
      toggle = 'Enable';
      btnCls = 'primary';
    }
    if(this.state.screens) {
      actions = <ActionRows
        getDisplayName={this.getDisplayName}
        handleRemove={this.handleRemove}
        items={this.state.screens.results}
      />;
    } else {
      actions = <p>No screen alerts set.</p>;
    }
    return <div>
      <h2 className="page-header">Manage Alerts</h2>
      <h3>Screen Alerts</h3>
      {actions}
      <h3>
        Watchlist alerts are currently {current}: <Button
          style={btnCls}
          onClick={this.handleWatchlistToggle}
          name={toggle}
        />
      </h3>
    </div>;
  }
}


export default Alerts
