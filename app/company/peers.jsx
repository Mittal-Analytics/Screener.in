"use strict"
import React from 'react'
import api from '../api.js'
import {Link} from 'react-router'
import {toLocalNumber} from '../components/utils.js'
import ManageColumns from '../modals/columns.modal.jsx'


class Peers extends React.Component {

  constructor(props) {
    super(props)
    this.onColumnsChange = this.onColumnsChange.bind(this)
    this.state = {
      peers: {results: [], ratios: []}
    }
  }

  componentDidMount() {
    this._req = this.fetchPeers(this.props.company)
  }

  componentWillReceiveProps(props) {
    if(props.company.id != this.props.company.id) {
      this.fetchPeers(props.company)
    }
  }

  fetchPeers(company) {
    var params = {industry: company.warehouse_set.industry}
    var wid = company.warehouse_set.id
    return api.get(api.cid(wid, 'peers'), params).then(resp => {
      this.setState({peers: resp})
    })
  }

  onColumnsChange() {
    this.fetchPeers(this.props.company)
  }

  render() {
    var company = this.props.company
    var peers = this.state.peers
    var Heads = peers.ratios.map(function(ratio, idx) {
      return <th key={idx}>
        <span>
          {ratio[1]}
          <br />
          {ratio[2]}
        </span>
      </th>
    })

    var Rows =  peers.results.map(function(row, idx) {
      var cname = row[1]
      var url = row[0]
      var self = (cname == company.short_name)
      var Cells = row.slice(2).map(function(cell, iidx) {
        return <td key={iidx}>{toLocalNumber(cell)}</td>
      })
      return <tr className={self ? 'self' : ''} key={idx}>
        <td className="text">{idx + peers.start}.</td>
        <td className="text"><Link to={url}>{cname}</Link></td>
        {Cells}
      </tr>
    })

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
    </div>
  }
}

Peers.propTypes = {
  company: React.PropTypes.object.isRequired
}

export default Peers
