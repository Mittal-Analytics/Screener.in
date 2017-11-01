"use strict";
/* global require, document, window */
import throttle from 'lodash/throttle'
import React from 'react'


var spyIds = [
  'top', 'charts', 'analysis', 'peers', 'quarters', 'annuals',
  'balancesheet', 'cashflow', 'reports'
];

var spies = [
  'name', 'Charts', 'Analysis', 'Peers', 'Quarters', 'Proft & Loss',
  'Balance Sheet', 'Cash Flow', 'Reports'
];


function inViewPercent(elem) {
  if(!elem)
    return 0;
  var rect = elem.getBoundingClientRect();
  var winHeight = window.innerHeight || document.documentElement.clientHeight;
  var elemHeight = rect.bottom - rect.top;
  var inView = Math.min(rect.bottom, winHeight) - Math.max(0, rect.top);
  return inView / elemHeight * 100;
}

var ScrollBar = React.createClass({

  getInitialState: function() {
    return {
      active: 'top',
      hover: false
    };
  },

  componentDidMount: function() {
    document.addEventListener('scroll', this.handleScroll);
  },

  componentWillUnmount: function() {
    document.removeEventListener('scroll', this.handleScroll);
  },

  handleScroll: throttle(function() {
    var head = document.querySelector('#companyhead');
    var hover = inViewPercent(head) <= 0;

    var spyViewCents = spyIds.map(function(spyId) {
      var el = document.querySelector('#' + spyId);
      return inViewPercent(el);
    });
    if (hover)
      spyViewCents[0] = -1;
    else
      spyViewCents[0] = 100;
    var mostVisible = Math.max.apply(null, spyViewCents);
    var active = spyIds[spyViewCents.indexOf(mostVisible)];
    this.setState({active: active, hover: hover});
  }, 125, {leading: false}),

  scrollTo: function(event) {
    event.preventDefault();
    var section = document.querySelector(event.target.getAttribute('href'));
    section.scrollIntoView();
  },

  render: function() {
    spies[0] = this.props.short_name;
    var subnavClasses = "navbar-default subnav hidden-xs hidden-print";
    subnavClasses += this.state.hover ? ' subnav-fixed' : '';
    var i = -1;
    return (
      <div className={subnavClasses}>
        <ul className="nav nav-pills" id="scrollbar">
          {spies.map(function(spy) {
            i++;
            return (
              <li key={i} className={spyIds[i] == this.state.active ? 'active' : ''}>
                <a href={'#' + spyIds[i]} onClick={this.scrollTo}>{spy}</a>
              </li>
            );
          }.bind(this))}
        </ul>
      </div>
    );
  }
});

export default ScrollBar
