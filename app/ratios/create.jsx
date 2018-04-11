"use strict";
import React from 'react'
import api from '../api.js'
import {setTitle} from '../components/utils.js'
import RatioForm from './form.jsx'
import {Link} from 'react-router';


class CreateRatio extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      formHTML: false,
      ratios: false
    }
  }

  componentDidMount() {
    setTitle('Create new ratio')
    api.get('ratios').then(
      resp => this.setState({ratios: resp.results})
    )
    return api.rawGet('/ratios.html').then(
      resp => this.setState({formHTML: {__html: resp}})
    )
  }

  renderExistingRatios() {
    var ratios = this.state.ratios
    if(ratios === false)
      return <h3>Loading...</h3>
    if(!ratios.length)
      return false
    var rows = ratios.map((ratio, idx) => {
      var link = <Link to={`/ratios/${ratio.id}/`}>
        {ratio.ratio_name}
      </Link>
      return <tr key={idx}>
        <td className="text">{link}</td>
        <td className="text">{ratio.formula}</td>
        <td>
          <Link
            to={`/ratios/${ratio.id}/delete/`}
            className="text-danger"
          >Delete</Link>
        </td>
      </tr>
    })
    return <div>
      <table className="table table-striped">
        <tbody>{rows}</tbody>
      </table>
      <hr />
    </div>
  }

  render() {
    var ratioForm = this.state.formHTML && <RatioForm
      formHTML={this.state.formHTML}
    />
    return <div>
      <h2 className="page-header">Custom Ratios</h2>
      {this.renderExistingRatios()}
      <h3>Create new ratio</h3>
      {ratioForm}
    </div>
  }
}

export default CreateRatio
