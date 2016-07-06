"use strict";
/* global require */

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
var CompanySearch = require('../components/company.search.jsx');


var Company = React.createClass({
  getInitialState: function() {
    return {
      company: {
        name: this.props.params.exchange_code + ' Loading...',
        short_name: 'Company name',
        industry: 'Industry',
        warehouse_set: {status: 'Active'}
      },
      compareCompany: {
        exchange_code: null,
        companyData : null
      },
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
    if (this.state.compareCompany.exchange_code)
      this.fetchCompareCompany(this.state.compareCompany.exchange_code, con);
    Api.get(Api.company(exc, con)).then(function(response) {
      Utils.setTitle(response.name);
      this.setState({company: response});
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

  fetchCompareCompany: function(exc, con) {
    Api.get(Api.company(exc, con)).then(function(response) {
      var hasData = Object.keys(response.number_set['annual'][0][1]).length;
      this.setState({compareCompany: {exchange_code: exc, companyData: hasData > 0 ? response : null}});
    }.bind(this));
  },

  handleCompareCompany: function(company) {
    var regsplres = company.url.split("\/");
    var exc = regsplres[2];
    var con = this.props.params.consolidated;
    this.fetchCompareCompany(exc, con);
  },

  render: function() {
    var company = this.state.company;
    var wid = company.warehouse_set.id;
    var quickratios = company.id ? <QuickRatios wid={company.warehouse_set.id} /> : '';
    var loaded = company.id ? <div>
      <section id="analysis">
        <Misc.Analysis analysis={company.warehouse_set.analysis} />
      </section>
      <section id="peers">
        <Peers wid={wid} short_name={company.short_name} industry={company.warehouse_set.industry} />
      </section>
      <section id="quarters">
        <Results report="quarters" company={company} />
      </section>
      <section id="annuals">
        <h4 className="pull-left">Compare with another company</h4>
        <a
          className="pull-right btn btn-default"
          onClick={() => this.setState({compareCompany: {exchange_code: null, companyData: null}})}
        >Remove comparison</a>
        <CompanySearch large={true} onSelect={this.handleCompareCompany} />
        <Results report="annual" company={company} compareCompany={this.state.compareCompany['companyData']} />
        <Misc.Ranges warehouse_set={company.warehouse_set} />
      </section>
      <section id="balancesheet">
        <Results report="balancesheet" company={company} />
      </section>
      <section id="cashflow">
        <Results report="cashflow" company={company} />
      </section>
      <section id="reports" className="hidden-print row">
        <div className="col-sm-12 col-lg-6">
          <Misc.Announcements bse_code={company.bse_code} announcement_set={company.announcement_set} />
        </div>
        <div className="col-sm-4 col-lg-3" ng-if="vm.company.annualreport_set.length > 0">
          <Misc.AnnualReports annualreport_set={company.annualreport_set} />
        </div>
        <div className="col-sm-8 col-lg-3" ng-if="vm.company.companyrating_set.length > 0">
          <Misc.CompanyRatings companyrating_set={company.companyrating_set} />
        </div>
      </section>
    </div> : <h3>Loading...</h3>;
    return <div>
      <Misc.CompanyHeader
        company={company}
        favorites={this.state.favorites}
        handleFavorite={this.handleFavorite}
      />
      <ScrollBar short_name={company.short_name} />
      <section>
        <CompanyRatios company={company} />
        {quickratios}
      </section>
      <section id="charts">
        <PriceChart id={company.id} />
      </section>
      {loaded}
    </div>;
  }
});

module.exports = Company;
