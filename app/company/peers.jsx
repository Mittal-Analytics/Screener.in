"use strict";
/* global require, window, document */

var React = require('react');
var Api = require('../api.js');
var Link = require('react-router/lib/Link');
var Utils = require('app/components/utils.js');
var ManageColumns = require('app/modals/columns.modal.jsx');


var Peers = React.createClass({

  getInitialState: function() {
    return {peers: {results: [], ratios: []}};
  },

  componentDidMount: function() {
    this.fetchPeers(this.props);
  },

  componentWillReceiveProps: function(props) {
    if(props.wid != this.props.wid) {
      this.fetchPeers(props);
    }
  },

  fetchPeers: function(props) {
    var params = {industry: props.industry};
    Api.get(Api.cid(props.wid, 'peers'), params)
      .then(function(response) {
        this.setState({peers: response});
      }.bind(this));
  },

  onColumnsChange: function() {
    this.fetchPeers(this.props);
  },

  render: function() {
    var peers = this.state.peers;
    var Heads = peers.ratios.map(function(ratio, idx) {
      return <th key={idx}>
        <span tooltip={ratio[0]}>
          {ratio[1]}
          <br />
          {ratio[2]}
        </span>
      </th>;
    });

    var ownName = this.props.short_name;
    var Rows =  peers.results.map(function(row, idx) {
      var cname = row[1];
      var url = row[0];
      var self = (cname == ownName);
      var Cells = row.slice(2).map(function(cell, iidx) {
        return <td key={iidx}>{Utils.toLocalNumber(cell)}</td>;
      });
      return <tr className={self ? 'self' : ''} key={idx}>
        <td className="text">{idx + peers.start}.</td>
        <td className="text"><Link to={url}>{cname}</Link></td>
        {Cells}
      </tr>;
    });

    return <div>
      <div className="pull-right">
        <ManageColumns
          onClose={this.onColumnsChange}
          className="btn btn-default"
        />
      </div>
      <h2>
        Peer Comparison
        <small> Top 7 companies in the same business</small>
      </h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th className="text">S.No.</th>
              <th className="text">Name</th>
              {Heads}
            </tr>
          </thead>
          <tbody>
            {Rows}
          </tbody>
        </table>
      </div>
    </div>;
  }
});


module.exports = Peers;
