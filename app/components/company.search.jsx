"use strict";
import React from 'react'
import classNames from 'classnames'
import api from '../api.js'
import Typeahead from './typeahead.jsx'
import Icon from './icon.jsx'


class CompanySearch extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.onChange = this.onChange.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.state = {
      options: []
    }
  }

  onChange(term) {
    this.req = api.get(api.search, {q: term}).then(
      resp => this.setState({options: resp})
    )
  }

  onSelect(idx) {
    var selected = this.state.options[idx]
    this.props.onSelect(selected)
  }

  render() {
    var buttonClass = classNames(
      'btn btn-primary',
      this.props.large && 'btn-lg'
    )
    return <div className="input-group">
      <Typeahead
        className={this.props.large && "input-lg"}
        placeholder={this.props.placeholder || 'Enter a company name'}
        options={this.state.options}
        onChange={this.onChange}
        onSelect={this.onSelect} />
      <span className="input-group-btn">
        <button className={buttonClass}>
          <Icon name="search" />
          <span className="hidden-sm hidden-xs"> Search</span>
        </button>
      </span>
    </div>
  }
}

CompanySearch.propTypes = {
  onSelect: React.PropTypes.func.isRequired,
  large: React.PropTypes.bool,
  placeholder: React.PropTypes.string
}

export default CompanySearch
