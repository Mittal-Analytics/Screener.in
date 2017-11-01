"use strict";
import React from 'react'
import api from '../api.js'
import {setTitle} from '../components/utils.js'
import RatioForm from './form.jsx'


class EditRatio extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      formHTML: false,
      ratio: {}
    }
  }

  componentDidMount() {
    setTitle('Edit ratio')
    var ratioId = this.props.params.ratioId
    this._req = api.rawGet(['ratios', ratioId + '.html']).then(
      formHTML => api.get(['ratios', ratioId]).then(
        resp => this.setState({
          ratio: resp,
          formHTML: {__html: formHTML}
        })
      )
    )
  }

  render() {
    if(!this.state.formHTML)
      return <h3>Loading...</h3>
    var ratio = this.state.ratio
    return <div>
      <h3>Edit ratio: {ratio.ratio_name}</h3>
      <RatioForm
        formHTML={this.state.formHTML}
        ratioId={ratio.id}
        formula={ratio.formula}
      />
    </div>
  }
}

EditRatio.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default EditRatio
