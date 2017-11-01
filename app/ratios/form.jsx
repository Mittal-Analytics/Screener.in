"use strict";
import React from 'react'
import api from '../api.js'
import classNames from 'classnames'
import QueryBuilder from '../components/query.builder.jsx'
import Alert from '../components/alerts.jsx'
import {getFormData, toLocalNumber} from '../components/utils.js'
import Icon from '../components/icon.jsx'


class RatioForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isPreview: false,
      errors: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  componentDidMount() {
    if(!window.loggedIn)
      return (window.location = '/register/')
  }

  handleSubmit(event) {
    event.preventDefault()
    var data = getFormData(this.refs.form)
    data['formula'] = data['builder']
    delete data['builder']
    if (this.state.isPreview) {
      var ratioId = this.props.ratioId
      var save = ratioId ? 'put' : 'post'
      var url = ratioId ? ['ratios', ratioId] : ['ratios']
      return api[save](url, data).then(
        () => window.location = '/ratios/',
        err => this.setState({errors: err, isPreview: false})
      )
    }
    return api.post(['ratios', 'preview'], data).then(
      resp => this.setState({isPreview: resp, errors: false}),
      err => this.setState({errors: err, isPreview: false})
    )
  }

  handleEdit() {
    this.setState({isPreview: false, errors: false})
  }

  renderPreview() {
    if(!this.state.isPreview)
      return false
    var data = getFormData(this.refs.form)
    var rows = this.state.isPreview.map((company, idx) => {
      return <tr key={idx}>
        <td className="text">{company.short_name}</td>
        <td>{toLocalNumber(company.preview)}</td>
      </tr>
    })
    return <div>
      <h4>Check the preview</h4>
      <table className="table table-striped">
        <tbody>
          <tr>
            <th className="text">
              {data.short_name}
              <br />
              {data.unit}
            </th>
            <th>Value</th>
          </tr>
          {rows}
        </tbody>
      </table>
      <button
        className="btn btn-danger pull-right"
        onClick={this.handleEdit}>
        <Icon name="arrow-left" /> Edit
      </button>
    </div>
  }

  render() {
    var assist = {
      lead: 'Custom Formula Example',
      description: <p>
        Price to Earning / Profit growth 5Years
      </p>,
      help: <a
        href="http://blog.screener.in/2012/07/creating-ratios/"
        >Detailed guide on creating custom ratios
      </a>
    }
    var buttonCls = this.state.isPreview ? "btn-primary" : "btn-success"
    var buttonText = this.state.isPreview ? "Save" : "Preview & Save"
    return <form onSubmit={this.handleSubmit} ref="form">
      <div className={classNames({'sr-only': this.state.isPreview})}>
        <input
          type="hidden"
          name="csrfmiddlewaretoken"
          value={api.getCsrf()} />
        <div dangerouslySetInnerHTML={this.props.formHTML}></div>
        <div className="form-group">
          <label>Formula = </label>
          <QueryBuilder
            name="builder"
            placeholder="Eg. Operating profit - Tax"
            value={this.props.formula}
            error={this.state.errors && this.state.errors.formula}
            assist={assist}
          />
        </div>
      </div>
      {this.renderPreview()}
      <Alert errors={this.state.errors} />
      <button
        className={classNames('btn', buttonCls)}
        type="submit">
        <Icon name="floppy-disk" /> {buttonText}
      </button>
    </form>
  }
}

RatioForm.propTypes = {
  formHTML: React.PropTypes.object.isRequired,
  ratioId: React.PropTypes.number,
  formula: React.PropTypes.string
}

export default RatioForm
