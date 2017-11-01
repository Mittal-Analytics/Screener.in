"use strict";
import React from 'react'
import {toSlug, withUnit, toLocalNumber} from '../components/utils.js'
import URITemplate from 'urijs/src/URITemplate'


function getExchanges(company) {
  var bse_link =  '',
      nse_link = '';
  if(company.bse_code !== "") {
    var slug = toSlug(company.name);
    bse_link = new URITemplate(
      'http://www.bseindia.com/stock-share-price{/slugs*}/'
    );
    bse_link = bse_link.expand({slugs: [slug, slug, company.bse_code]});
    bse_link = <a href={bse_link}>BSE</a>;
  }
  if(company.nse_code !== "") {
    nse_link = new URITemplate(
      'http://nseindia.com/live_market/dynaContent/live_watch/' +
      'get_quote/GetQuote.jsp{?params*}'
    );
    nse_link = nse_link.expand({params: {symbol: company.nse_code}});
    nse_link = <a href={nse_link}>NSE</a>;
    if(bse_link !== '')
      nse_link = <span> and {nse_link}</span>;
  }
  return <span>Listed on {bse_link}{nse_link}</span>;
}


function CompanyRatios(props) {
  var name = props.company.name;
  var warehouse_set = props.company.warehouse_set;
  var google = "http://www.google.co.in/search?ie=UTF-8&oe=UTF-8&sourceid=navclient&gfns=1&q=" + name;
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
        <b> {withUnit(warehouse_set[ratio[1]], ratio[2])}</b>
      </h4>;
    })}
    <h4 className="col-sm-4">{getExchanges(props.company)}</h4>
    <h4 className="col-sm-4">
      <a href={google} target="_blank">Company Website</a>
    </h4>
    <h4 className="col-sm-4">
      52 Week High/Low:
      <b> ₹ {toLocalNumber(warehouse_set.high_price)} /
          ₹ {toLocalNumber(warehouse_set.low_price)}
      </b>
    </h4>
  </div>;
}

export default CompanyRatios
