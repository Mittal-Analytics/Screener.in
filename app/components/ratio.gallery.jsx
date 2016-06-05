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

  renderOpen() {
    var ratios = this.state.ratios
    var categories = [
      "Annual Results",
      "Balance Sheet",
      "Cash Flow Statement",
      "Quarterly Results",
      "Valuation",
      "Ratios"
    ]
    var variables = {
      "Rs.Cr.": [],
      "Rs.": [],
      "Cr.": [],
      "%": [],
      "": []
    }
    for (var i = 0; i < ratios.system_ratios.length; i++) {
      var unit = ratios.system_ratios[i][0]
      var category = ratios.system_ratios[i][3]
      if (this.state.currentCategory != category)
        continue
      variables[unit].push(ratios.system_ratios[i])
    }
    return <div>
      <Button
        icon="eye-close"
        onClick={this.handleClose}
        name="Close Gallery"
      />
      <div>
        Categories
        {categories.map((category, idx) => {
          return <Button
            style="primary"
            icon="pencil"
            onClick={() => this.handleCategorySelection(category)}
            name={category}
            key={idx}
          />
        })}
      </div>
      <div>
        Variables
        {variables["Rs.Cr."].map((variable, idx) => {
          return <Button
            key={idx}
            style="default"
            onClick={() => this.props.onRatioClick(variable)}
            name={variable[1]}
          />
        })}
      </div>
    </div>
  }

  render() {
    if (this.state.galleryOpen)
      return this.renderOpen()
    return <Button
      style="info"
      icon="eye-open"
      onClick={this.handleOpen}
      name="Show all ratios"
    />
  }
}

RatioGallery.propTypes = {
  onOpen: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired,
  onRatioClick: React.PropTypes.func.isRequired
}

module.exports = RatioGallery
