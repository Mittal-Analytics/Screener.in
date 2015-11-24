"use strict";
/* global require */
var React = require('react');
var Utils = require('app/components/utils.js');
var URITemplate = require('urijs/src/URITemplate');


function getExchanges(company) {
  var bse_link =  '',
      nse_link = '';
  if(company.bse_code !== "") {
    var slug = Utils.toSlug(company.name);
    bse_link = new URITemplate(
      'http://www.bseindia.com/stock-share-price{/slugs*}/'
    );
    bse_link = bse_link.expand([slug, slug, company.bse_code]);
    bse_link = <a href={bse_link}>BSE</a>;
  }
  if(company.nse_code !== "") {
    nse_link = new URITemplate(
      'http://nseindia.com/live_market/dynaContent/live_watch/' +
      'get_quote/GetQuote.jsp{?params*}'
    );
    nse_link = nse_link.expand({symbol: company.nse_code});
    nse_link = <a href={nse_link}>NSE</a>;
    if(bse_link !== '')
      nse_link = <span> and {nse_link}</span>;
  }
  return <span>Listed on {bse_link}{nse_link}</span>;
}


function CompanyRatios(props) {
  var name = props.company.name;
  var warehouse_set = props.company.warehouse_set;
  var google = "http://google.com/search?btnI=1&amp;q=" + name;
  var ratios = [
    ['Market Cap.', 'market_capitalization', 'Rs.Cr.'],
    ['Current Price', 'current_price', 'Rs.'],
    ['Book Value', 'book_value', 'Rs.'],
    ['Stock P/E', 'price_to_earning', ''],
    ['Dividend Yield', 'dividend_yield', '%'],
    ['Face Value', 'face_value', 'Rs.'],
  ];
  return <div>
    {ratios.map(function(ratio, idx) {
      return <h4 className="col-sm-4" key={idx}>
        {ratio[0]}:
        <b> {Utils.withUnit(warehouse_set[ratio[1]], ratio[2])}</b>
      </h4>;
    })}
    <h4 className="col-sm-4">{getExchanges(props.company)}</h4>
    <h4 className="col-sm-4">
      <a href={google} target="_blank">Company Website</a>
    </h4>
    <h4 className="col-sm-4">
      52 Week High/Low:
      <b> ₹ {Utils.toLocalNumber(warehouse_set.high_price)} /
          ₹ {Utils.toLocalNumber(warehouse_set.low_price)}
      </b>
    </h4>
  </div>;
}

module.exports = CompanyRatios;
