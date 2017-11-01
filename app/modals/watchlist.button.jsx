"use strict";
import React from 'react'
import Modal from '../components/modal.jsx'
import CompanySearch from '../components/company.search.jsx'
import api from '../api.js'
import ActionRows from './action.rows.jsx'


class WatchlistButton extends React.Component {

  constructor(props, context) {
    super(props, context);
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
      name="Edit Watchlist"
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


export default WatchlistButton
