"use strict";
import React from 'react'
import ManageColumns from '../modals/columns.modal.jsx'
import Confirm from '../components/confirm.jsx'
import Notify from '../components/notify.jsx'
import api from '../api.js'
import {setTitle} from '../components/utils.js'
import UserTable from './table.jsx'
import ScreenBase from './base.jsx'


class Screen extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      errors: false,
      screen: false
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
    this.onColumnsChange = this.onColumnsChange.bind(this);
  }

  componentDidMount() {
    this._req = this.fetchResults(
      this.props.params.screenId,
      this.props.location.query
    );
  }

  componentWillReceiveProps(props) {
    var new_id = props.params.screenId;
    var old_id = this.props.params.screenId;
    var new_params = props.location.search;
    var old_params = this.props.location.search;
    if(new_params != old_params || new_id != old_id)
      this.fetchResults(new_id, props.location.query);
  }

  onColumnsChange() {
    this.fetchResults(
      this.props.params.screenId,
      this.props.location.query
    );
  }

  fetchResults(screenId, params) {
    var url = '/screens/' + screenId + '/';
    return api.get(url, params).then(resp => {
      setTitle(resp.name);
      this.setState({screen: resp, errors: false});
    }, resp => {
      this.setState({errors: resp, screen: false});
    });
  }

  handleDelete() {
    var screenId = this.props.params.screenId;
    return api.delete(['screens', screenId]).then(() => {
      this.context.router.push('/dash/');
    });
  }

  handleAlert() {
    var data = {screen: this.state.screen.id};
    return api.post(['alerts'], data);
  }

  renderLoaded() {
    var screen = this.state.screen;
    var alert = !screen.has_alert && <Notify
      style="info"
      icon="bell"
      onClick={this.handleAlert}
      name="Set Alert"/>;
    var deleteScreen = screen.is_owner && <Confirm
      onClick={this.handleDelete}
      name="Delete this screen"/>;
    var manageCols = <ManageColumns
      onClose={this.onColumnsChange}
      className="btn btn-default"/>;
    return <div>
      <div className="page-header">
        <div className="pull-right">
          {alert} {deleteScreen} {manageCols}
        </div>
        <h2>
          {screen.name}
          <small> {screen.description}</small>
        </h2>
      </div>

      <UserTable
        page={screen.page}
        link={this.props.location.pathname}
        query={this.props.location.query}
      />
  </div>;
  }

  render() {
    return <ScreenBase
      errors={this.state.errors}
      screen={this.state.screen}
      builderDefaults={this.state.screen}
      >
      {this.state.screen && this.renderLoaded()}
    </ScreenBase>;
  }
}

Screen.propTypes = {
  params: React.PropTypes.object,
  location: React.PropTypes.object
}

Screen.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default Screen
