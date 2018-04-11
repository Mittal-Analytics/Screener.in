"use strict";
import React from 'react'
import {Link} from 'react-router'
import {getPageNumbers, toLocalNumber} from '../components/utils.js'
import defaults from 'lodash/defaults'
import classNames from 'classnames'


function Pagination(props) {
  var page = props.page;
  var limits = [15, 30, 50].map(function(limit, idx) {
    var query = defaults({limit: limit}, props.query);
    var classes = classNames({active: page.limit == limit});
    return <li className={classes} key={idx}>
      <Link to={{pathname: props.link, query: query}}>{limit}</Link>
    </li>;
  });

  var adjacentPages = getPageNumbers(page.current, page.total);
  adjacentPages = adjacentPages.map(function(pageNum, idx) {
    var url = defaults({page: pageNum}, props.query);
    var classes = classNames({
      active: page.current == pageNum,
      disabled: pageNum == "…"
    });
    return <li className={classes} key={idx}>
      <Link to={{pathname: props.link, query: url}}>{pageNum}</Link>
    </li>;
  });

  return <div>
    <ul className="pagination pull-right">
      <li className="disabled">
        <a>Results per page</a>
      </li>
      {limits}
    </ul>

    <ul className="pagination">
      <li className="disabled"><a>Page No.</a></li>
      {adjacentPages}
      <li className="disabled">
        <span>{page.count} results</span>
      </li>
    </ul>
  </div>;
}



function UserTable(props) {
  var page = props.page;
  var sortOn = function(name) {
    var order = props.query.order == 'desc' ? 'asc' : 'desc';
    return defaults({sort: name, order: order, page: 1}, props.query);
  };

  var cols = [['', 'S.No.', ''], ['name', 'Name', '']].concat(page.ratios);
  var Heads = cols.map(function(ratio, idx) {
    var headClass = (idx < 2) ? 'text' : '';
    var sorted = page.sort == ratio[0] ? page.order : '';
    return <th key={idx} className={headClass}>
      <Link
        to={{pathname: props.link, query: sortOn(ratio[0])}}
        className={sorted}>
          {ratio[1]}
          <br />
          {ratio[2]}
      </Link>
      <div role="tooltip" className="in tooltip bottom">
        <div className="tooltip-arrow"></div>
        <div className="tooltip-inner">{ratio[0]}</div>
      </div>
    </th>;
  });
  Heads = <tr>{Heads}</tr>;

  var Rows =  page.results.map(function(row, idx) {
    var cname = row[1];
    var url = row[0];
    var Cells = row.slice(2).map(function(cell, iidx) {
      return <td key={iidx}>{toLocalNumber(cell)}</td>;
    });
    return <tr key={idx}>
      <td className="text">{idx + page.start}.</td>
      <td className="text"><Link to={url}>{cname}</Link></td>
      {Cells}
    </tr>;
  });

  for (var i = 12; i < Rows.length; i+=12) {
    Rows.splice(i, 0, Heads);
  }

  var pagination = props.page.total > 1 && <Pagination
    page={props.page}
    link={props.link}
    query={props.query} />;

  return <div>
    <h3><small>
      {page.count} Results Found: Showing Page {page.current} of {page.total}
    </small></h3>
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          {Heads}
        </thead>
        <tbody>
          {Rows}
        </tbody>
      </table>
    </div>
    {pagination}
  </div>;
}


export default UserTable
