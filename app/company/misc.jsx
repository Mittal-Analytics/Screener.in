"use strict";
/* global require, document, window */
import React from 'react'
import Icon from '../components/icon.jsx'
import Button from '../components/button.jsx'


function CompanyHeader(props) {
  var company = props.company;
  var added = props.favorites.indexOf(company.id) >= 0;
  var favButton = added || <Button
    style="success"
    icon="heart"
    onClick={props.handleFavorite.bind(null, company.id)}
    name="Add to Watchlist" />;
  var excelButton = <a
    className="btn btn-info"
    href={`/excel/${company.warehouse_set.id}/`}>
    <Icon name="save" /> Export to Excel
  </a>;
  var status = company.warehouse_set.status;
  var suffix =  status == 'Active' ? '' : ' - ' + status;
  return <div id="companyhead" className="page-header">
    <div className="pull-right">
      {favButton} {excelButton}
    </div>
    <h1>
      {company.name}
      {suffix}
      <small> {company.warehouse_set.industry}</small>
    </h1>
  </div>;
}


function Analysis(props) {
  function points(point, idx) {
    if(!point) return;
    return <p className="h4 easy" key={idx}>
      - {point}
    </p>;
  }
  var analysis = props.analysis;
  var pros = analysis.good.map(points);
  var cons = analysis.bad.map(points);
  var remarks = analysis.remarks.map(function(point, idx) {
    return <p key={idx}>- {point}</p>;
  });

  return <div>
    <div className="row">
      <div className="col-sm-6 callout callout-info">
        <h4>Pros:</h4>
        {pros}
      </div>
      <div className="col-sm-6 callout callout-warning">
        <h4>Cons:</h4>
        {cons}
      </div>
    </div>
  </div>;
}


function Announcements(props) {
  var announcements = props.announcement_set.map(function(ann, idx) {
    var url = ann.link + '&param1=1';
    return <p className="h4 easy" key={idx}>
      - <a href={url} target="_blank">
        {ann.announcement}
      </a>
      <small className="sub"> {ann.ann_date}</small>
    </p>;
  });

  var allUrl = "http://www.bseindia.com/corporates/ann.aspx?scrip=" + props.bse_code + "%20&dur=A";
  var viewAll = props.bse_code === '' ? false : <p>
    <a href={allUrl} target="_blank">
      View all announcements
    </a>
  </p>;

  return <div>
    <h3>Recent Announcements</h3>
    {announcements}
    {viewAll}
  </div>;
}


function AnnualReports(props) {
  var reports = props.annualreport_set.map(function(report, idx) {
    return <p className="h4 easy" key={idx}>
      - <a href={report.link} rel="noreferrer" target="_blank">
        Financial Year {report.report_date}
      </a>
      <small className="sub"> from {report.source}</small>
    </p>;
  });
  return <div>
    <h3>Annual Reports</h3>
    {reports}
  </div>;
}


function CompanyRatings(props) {
  if(props.companyrating_set.length === 0)
    return <div></div>;
  var reports = props.companyrating_set.map(function(report, idx) {
    return <p className="h4 easy" key={idx}>
      <a href={report.link} target="_blank">
        {report.rating__rating}
      </a> <small className="sub">
        for {report.instrument} from {report.rating__source}
      </small>
    </p>;
  });
  return <div>
    <h3>Credit Rating</h3>
    {reports}
  </div>;
}


function Ranges(props) {
  return <div className="row">
    <div className="col-sm-4">
      <h4>Compounded Sales Growth:</h4>
      <dl className="dl-horizontal">
        <dt className="upper">10 Years:</dt>
        <dd>{props.warehouse_set.sales_growth_10years}%</dd>
        <dt className="upper">5 Years:</dt>
        <dd>{props.warehouse_set.sales_growth_5years}%</dd>
        <dt className="upper">3 Years:</dt>
        <dd>{props.warehouse_set.sales_growth_3years}%</dd>
        <dt className="upper">TTM:</dt>
        <dd>{props.warehouse_set.sales_growth}%</dd>
      </dl>
    </div>
    <div className="col-sm-4">
      <h4>Compounded Profit Growth:</h4>
      <dl className="dl-horizontal">
        <dt className="upper">10 Years:</dt>
        <dd>{props.warehouse_set.profit_growth_10years}%</dd>
        <dt className="upper">5 Years:</dt>
        <dd>{props.warehouse_set.profit_growth_5years}%</dd>
        <dt className="upper">3 Years:</dt>
        <dd>{props.warehouse_set.profit_growth_3years}%</dd>
        <dt className="upper">TTM:</dt>
        <dd>{props.warehouse_set.profit_growth}%</dd>
      </dl>
    </div>
    <div className="col-sm-4">
      <h4>Return on Equity:</h4>
      <dl className="dl-horizontal">
        <dt className="upper">10 Years:</dt>
        <dd>{props.warehouse_set.average_return_on_equity_10years}%</dd>
        <dt className="upper">5 Years:</dt>
        <dd>{props.warehouse_set.average_return_on_equity_5years}%</dd>
        <dt className="upper">3 Years:</dt>
        <dd>{props.warehouse_set.average_return_on_equity_3years}%</dd>
        <dt className="upper">TTM:</dt>
        <dd>{props.warehouse_set.return_on_equity}%</dd>
      </dl>
    </div>
  </div>;
}


export {CompanyHeader}
export {Ranges}
export {Analysis}
export {Announcements}
export {AnnualReports}
export {CompanyRatings}
