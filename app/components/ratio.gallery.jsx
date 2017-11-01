"use strict";
import React from 'react'
import Button from './button.jsx'
import Api from '../api.js'


function RatiosList(props) {
  if(props.ratios.length == 0)
    return false
  return <ul className="nav col-md-3">
    <li className="heading">{props.heading}</li>
    {props.ratios.map((ratio, idx) => {
      return <li key={idx}>
        <a onClick={() => props.onRatioClick(ratio)}>
          {ratio[1]}
        </a>
      </li>
    })}
  </ul>
}

RatiosList.propTypes = {
  heading: React.PropTypes.string.isRequired,
  ratios: React.PropTypes.array.isRequired,
  onRatioClick: React.PropTypes.func.isRequired
}


class RatioGallery extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleCategorySelection = this.handleCategorySelection.bind(this)
    this.state = {
      ratios: [],
      galleryOpen: false,
      currentCategory: "Annual Results",
      searchTerm: ""
    }
  }

  handleOpen() {
    return Api.get(['ratios', 'all']).then(
      response => {
        this.setState({
          ratios: response,
          galleryOpen: true
        })
      }
    )
  }

  handleClose() {
    this.setState({galleryOpen: false})
  }

  handleCategorySelection(category) {
    this.setState({
      currentCategory: category,
      searchTerm: ""
    })
  }

  getCategoryGroups(ratios, currentCategory) {
    var groups = {
      recent: [],
      preceding: [],
      historical: []
    }
    for (var i = 0; i < ratios.length; i++) {
      var ratio = ratios[i]
      var category = ratio[3]
      if (currentCategory != 'Searched' && currentCategory != category)
        continue
      var group
      if (ratio[1].indexOf("preceding year quarter") > -1)
        group = "historical"
      else if (ratio[1].indexOf("receding") > -1)
        group = "preceding"
      else if (ratio[1].search(/\dyear/i) > -1)
        group = "historical"
      else
        group = "recent"
      groups[group].push(ratio)
    }
    return groups
  }

  filterRatios(ratios, searchTerm) {
    var pattern = new RegExp(searchTerm, "i")
    var system_ratios = ratios.system_ratios.filter(ratio => {
      return ratio[1].search(pattern) > -1 || ratio[2].search(pattern) > -1
    })
    return system_ratios
  }

  renderToolbar() {
    var operators = ["+", "-", "/", "*", ">", "<", "AND\n", "OR\n"]
    return <div className="form-inline">
      <div className="pull-right">
        <Button
          style="danger"
          icon="eye-close"
          onClick={this.handleClose}
          name="Close Gallery"
        />
      </div>

      {operators.map((operator, idx) => {
        return <span key={idx}><a
          className="btn btn-default"
          onClick={() => this.props.onRatioClick(operator)}
          >
          {operator}
        </a>{" "}</span>
      })}

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Filter Ratio"
          value={this.state.searchTerm}
          onChange={event => this.setState({
            searchTerm: event.target.value,
            currentCategory: 'Searched'
          })}
          />
      </div>
    </div>
  }

  renderOpen() {
    var categories = [
      "Quarterly Results",
      "Quarterly Variations",
      "Annual Results",
      "Annual Variations",
      "Trailing 12 Months",
      "Balance Sheet",
      "Cash Flow Statement",
      "Valuation",
      "Ratios",
      "User Ratios"
    ]
    var currentCategory = this.state.currentCategory
    var ratios = this.state.ratios.system_ratios
    var searchTerm = this.state.searchTerm
    if(searchTerm.length > 0) {
      categories.push('Searched')
      ratios = this.filterRatios(this.state.ratios, this.state.searchTerm)
    }
    var user_ratios = currentCategory == 'User Ratios' && <RatiosList
      heading="User Ratios"
      ratios={this.state.ratios.user_ratios}
      onRatioClick={this.props.onRatioClick}
      />
    var groups = this.getCategoryGroups(ratios, currentCategory)
    return <div className="gallery">
      <br />
      {this.renderToolbar()}
      <br />

      <div className="row">
        <ul className="nav col-md-2">
          <li className="heading">Select Category</li>
          {categories.map((category, idx) => {
            var active = currentCategory == category ? 'active' : ''
            return <li key={idx} className={active}>
              <a onClick={() => this.handleCategorySelection(category)}>
                {category}
              </a>
            </li>
          })}
        </ul>

        {user_ratios}
        <RatiosList
          heading="Recent"
          ratios={groups.recent}
          onRatioClick={this.props.onRatioClick}
          />
        <RatiosList
          heading="Preceding"
          ratios={groups.preceding}
          onRatioClick={this.props.onRatioClick}
          />
        <RatiosList
          heading="Historical"
          ratios={groups.historical}
          onRatioClick={this.props.onRatioClick}
          />
      </div>
    </div>
  }

  render() {
    if (this.state.galleryOpen)
      return this.renderOpen()
    return <div className="pull-right">
      <br />
      <Button
        style="default"
        icon="eye-open"
        onClick={this.handleOpen}
        name="Show all ratios"
      />
    </div>
  }
}

RatioGallery.propTypes = {
  onRatioClick: React.PropTypes.func.isRequired
}

export default RatioGallery
