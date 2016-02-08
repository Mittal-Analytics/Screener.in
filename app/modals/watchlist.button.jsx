"use strict";
/* global require, window */
var React = require('react');
var Modal = require('app/components/modal.jsx');
var CompanySearch = require('app/components/company.search.jsx');
var api = require('../api.js');
var ActionRows = require('./action.rows.jsx');


class WatchlistButton extends React.Component {

  constructor() {
    super();
    this.state = {items: []};
  }

  onOpen() {
    this.req = api.get('company').then(resp => {
      this.setState({items: resp});
    });
  }

  handleAdd(company) {
    var url = api.cid(company.id, 'favorite');
    return api.post(url).then(() => {
      this.setState({
        items: this.state.items.concat([company])
      });
    });
  }

  handleRemove(company) {
    return api.post(api.cid(company.id, 'unfavorite'));
  }

  getDisplayName(item) {
    return item.name;
  }

  render() {
    var style = this.props.style || 'default';
    return <Modal
      style={style}
      icon="plus"
      name="Add Companies"
      onOpen={this.onOpen.bind(this)}
      onClose={this.props.onClose}
      >
      <div>
        <CompanySearch onSelect={this.handleAdd.bind(this)} large={true} />
        <br />
        <ActionRows
          items={this.state.items}
          handleRemove={this.handleRemove}
          getDisplayName={this.getDisplayName}
        />
      </div>
    </Modal>;
  }
}


WatchlistButton.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  style: React.PropTypes.string
};


module.exports = WatchlistButton;
