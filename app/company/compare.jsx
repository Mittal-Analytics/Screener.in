"use strict";
import React from 'react'
import CompanySearch from '../components/company.search.jsx'
import UnderIcon from '../components/under.icon.jsx'
import Icon from '../components/icon.jsx'


class AddCompare extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.state = {
      selectedCompany: undefined
    }
  }

  handleAdd(company) {
    this.setState({selectedCompany: company})
    this.props.onAdd(company)
  }

  handleRemove() {
    this.setState({selectedCompany: undefined})
    this.props.onRemove()
  }

  renderAlreadyComparing() {
    var companyName = this.state.selectedCompany.name
    return <small>
      Comparing <b>{companyName}</b>
      <br />
      <a onClick={this.handleRemove}>
        <Icon name="remove" />
        Remove Comparison
      </a>
    </small>
  }

  render() {
    if (this.state.selectedCompany)
      return this.renderAlreadyComparing()
    return <UnderIcon icon="plus">
      <div>
        <i>Company for comparison</i>
        <CompanySearch placeholder="eg. Infosys" onSelect={this.handleAdd} />
      </div>
    </UnderIcon>
  }
}

AddCompare.propTypes = {
  onAdd: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired
}

module.exports = AddCompare
