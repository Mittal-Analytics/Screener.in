"use strict";
import React from 'react'
import Button from 'app/components/button.jsx'
import Api from 'app/api.js'

class RatioGallery extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleCategorySelection = this.handleCategorySelection.bind(this)
    this.state = {
      ratios: [],
      galleryOpen: false,
      currentCategory: "Annual Results"
    }
  }

  handleOpen() {
    return Api.get(['ratios', 'all']).then(
      response => {
        this.setState({
          ratios: response,
          galleryOpen: true
        })
        this.props.onOpen()
      }
    )
  }

  handleClose() {
    this.setState({galleryOpen: false})
    this.props.onClose()
  }

  handleCategorySelection(category) {
    this.setState({currentCategory: category})
  }

  getCategoryGroups() {
    var ratios = this.state.ratios
    var groups = {
      "Recent results": [],
      "Preceding period": [],
      "Historical": []
    }
    for (var i = 0; i < ratios.system_ratios.length; i++) {
      var group = ratios.system_ratios[i][0]
      var category = ratios.system_ratios[i][3]
      if (this.state.currentCategory != category)
        continue
      groups[group].push(ratios.system_ratios[i])
    }
    return groups
  }

  renderOpen() {
    var categories = [
      "Annual Results",
      "Balance Sheet",
      "Cash Flow Statement",
      "Quarterly Results",
      "Valuation",
      "Ratios"
    ]
    var groups = this.getCategoryGroups()
    return <div className="gallery">
      <div className="pull-right">
        <br />
        <Button
          style="danger"
          icon="eye-close"
          onClick={this.handleClose}
          name="Close Gallery"
        />
      </div>

      <div className="row">
        <ul className="nav col-md-2">
          <li className="heading">Select Category</li>
          {categories.map((category, idx) => {
            var active = this.state.currentCategory == category ? 'active' : ''
            return <li key={idx} className={active}>
              <a onClick={() => this.handleCategorySelection(category)}>
                {category}
              </a>
            </li>
          })}
        </ul>

        <ul className="nav col-md-5">
          {groups["Recent results"].map((variable, idx) => {
            return <li key={idx}>
              <a onClick={() => this.props.onRatioClick(variable)}>
                {variable[1]}
              </a>
            </li>
          })}
        </ul>
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
  onOpen: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired,
  onRatioClick: React.PropTypes.func.isRequired
}

module.exports = RatioGallery
