"use strict";
var React = require('react');
var isEqual = require('lodash/isEqual');
var Utils = require('../components/utils.js');
var Api = require('../api.js');
var Misc = require('./misc.jsx');
var Peers = require('./peers.jsx');
var Results = require('./results.jsx');
var ScrollBar = require('./scrollbar.jsx');
var CompanyRatios = require('./ratios.jsx');
var PriceChart = require('./pricechart.jsx');
var QuickRatios = require('./quickratios.jsx');
var AddCompare = require('./compare.jsx');


var Company = React.createClass({
  getInitialState: function() {
    return {
      company: undefined,
      comparisons: [],
      favorites: []
    };
  },

  componentDidMount: function() {
    this.fetchCompany(this.props.params);
    this.fetchFavorites();
  },

  componentWillReceiveProps: function(props) {
    if(isEqual(this.props.params, props.params))
      return;
    this.fetchCompany(props.params);
  },

  fetchCompany: function(params) {
    var exc = params.exchange_code;
    var con = params.consolidated;
    Api.get(Api.company(exc, con)).then(function(response) {
      Utils.setTitle(response.name);
      this.setState({
        company: response,
        comparisons: []
      });
    }.bind(this));
  },

  fetchFavorites: function() {
    if(!window.loggedIn)
      return;
    Api.get(['users', 'favorites']).then(function(response) {
      this.setState({favorites: response});
    }.bind(this));
  },

  handleFavorite: function(cid) {
    if(!window.loggedIn)
      return (window.location = '/register/');
    return Api.post(Api.cid(cid, 'favorite'))
      .then(function() {
        this.setState({
          favorites: this.state.favorites.concat([cid])
        });
      }.bind(this));
  },

  handleStartCompare: function() {
    var company = this.state.company
    var data = {force: company.warehouse_set.result_type}
    Api.get(Api.cid(company.id, 'comparison'), data).then(resp => {
      this.setState({comparisons: [resp]});
    });
  },

  handleAddCompare: function(company) {
    Api.get(Api.cid(company.id, 'comparison')).then(response => {
      var comparisons = this.state.comparisons.concat(response)
      this.setState({comparisons: comparisons});
    });
  },

  handleRemoveCompare: function() {
    this.setState({comparisons: []})
  },

  renderLoading: function() {
    return <h3>
      Loading {this.props.params.exchange_code}...
    </h3>
  },

  render: function() {
    var company = this.state.company
    var comparisons = this.state.comparisons
    if (!company)
      return this.renderLoading()
    return <div>
      <Misc.CompanyHeader
        company={company}
        favorites={this.state.favorites}
        handleFavorite={this.handleFavorite}
      />

      <ScrollBar short_name={company.short_name} />

      <section>
        <CompanyRatios company={company} />
        <QuickRatios wid={company.warehouse_set.id} />
      </section>

      <section id="charts">
        <PriceChart id={company.id} />
      </section>

      <section id="analysis">
        <Misc.Analysis analysis={company.warehouse_set.analysis} />
      </section>

      <section id="peers">
        <Peers company={company} />
        <AddCompare
          onStart={this.handleStartCompare}
          onAdd={this.handleAddCompare}
          onRemove={this.handleRemoveCompare}
          comparisons={comparisons} />
      </section>

      <section id="quarters">
        <Results report="quarters" company={company} comparisons={comparisons} />
      </section>

      <section id="annuals">
        <Results report="annual" company={company} comparisons={comparisons} />
        <Misc.Ranges warehouse_set={company.warehouse_set} />
      </section>

      <section id="balancesheet">
        <Results report="balancesheet" company={company} comparisons={comparisons} />
      </section>

      <section id="cashflow">
        <Results report="cashflow" company={company} comparisons={comparisons} />
      </section>

      <section id="reports" className="hidden-print row">
        <div className="col-sm-12 col-lg-6">
          <Misc.Announcements bse_code={company.bse_code} announcement_set={company.announcement_set} />
        </div>
        <div className="col-sm-4 col-lg-3">
          <Misc.AnnualReports annualreport_set={company.annualreport_set} />
        </div>
        <div className="col-sm-8 col-lg-3">
          <Misc.CompanyRatings companyrating_set={company.companyrating_set} />
        </div>
      </section>
    </div>
  }
});

module.exports = Company;
