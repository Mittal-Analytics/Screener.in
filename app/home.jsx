"use strict";
/* global require, document */

var React = require('react');
var CompanySearch = require('./components/company.search.jsx');

function Home(props, context) {

  function handleCompany(company) {
    context.router.push(company.url);
  }

  return <div>
    <div className="center-block text-center home-header">
      <img
        className="img-responsive center-block"
        src="/static/img/screener.png"
        alt="Screener Logo" />
      <h2>Welcome to Screener.in</h2>
      <p className="lead">
        Screener.in is a <strong>stock analysis and screening tool </strong>
        to see information of <strong>listed Indian companies </strong>
        in a customizable way.
      </p>
      <h4>Begin by searching a company</h4>
      <br />
      <CompanySearch large={true} onSelect={handleCompany} />
      <br />
      <p className="lead">
        Or Analyse: <a href="company/AVANTIFEED/">
        Avanti Feeds</a>, <a href="company/AYMSYNTEX/">
        AYM Syntex</a>, <a href="company/CANFINHOME/">
        Can-Fin Homes</a>, <a href="company/KSL/">
        Kalyani Steels</a>, <a href="company/KITEX/">
        Kitex Garments</a>, <a href="company/SHILPAMED/">
        Shilpa Medicare</a>, <a href="company/SANGHVIMOV/">
        Sanghvi Movers</a>, <a href="company/504959/">
        Stovec Industries</a>, <a href="company/TATAMETALI/">
        Tata Metaliks</a> ...
      </p>
    </div>
    <div className="row text-center home-footer">
      <h4>
        “Built by the Investors. Built for the Investors.”
      </h4>
    </div>
  </div>;
}

Home.contextTypes = {
  router: React.PropTypes.object.isRequired
}

module.exports = Home;
