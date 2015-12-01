"use strict";
/* global require, window */

var React = require('react');
var History = require('react-router/lib/History');
var Link = require('react-router/lib/Link');
var Nav = require('react-bootstrap/lib/Nav');
var Navbar = require('react-bootstrap/lib/Navbar');
var NavbarBrand = require('react-bootstrap/lib/NavbarBrand');
var classNames = require('classnames');

var CompanySearch = require('./components/company.search.jsx');
var Api = require('./api.js');


var Footer = React.createClass({
  render: function() {
    return (
      <footer className="footer">
        <hr />
        <span className="pull-right right-al no-print red">
          Made with <i className="glyphicon glyphicon-heart" /> in <b>India</b>.
        </span>
        <p>
          Navigation Links: <Link to="/">Home
          </Link> | <Link to="/screens/">Screens
          </Link> | <Link to="/talks/">Talks
          </Link> | <a href="http://blog.screener.in">Change Log
          </a> | <a href="http://dalal-street.in">Dalal-Street Blog
          </a> | <a href="https://bitbucket.org/screenerin/screener.in/issues/new">
            Report Errors
          </a>
        </p>
        <span className="sub">
          Data feed provided by C-MOTS Internet Technologies Pvt Ltd.
          <br />
          <b>DISCLAIMER:</b> Information is provided &quot;
          <a href="http://en.wikipedia.org/wiki/As_is">as is</a>&quot;
          and solely for informational purposes, not for trading purposes or
          advice, and may be delayed. <a href="/disclaimer/">
            (complete disclaimer)
          </a>
        </span>
      </footer>
    );
  }
});


var Navigation = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return {user: {}};
  },

  componentDidMount: function() {
    Api.get(Api.me).then(function(response) {
      var user = response;
      window.user = user;
      this.setState({user: user});
    }.bind(this));
  },

  handleCompany: function(company) {
    this.history.pushState(null, company.url);
  },

  handleLogOut: function() {
    Api.post(Api.logout).then(function() {
      window.loggedIn = false;
      window.user = {};
      this.setState({user: window.user});
    }.bind(this));
  },

  render: function() {
    var user_links;
    var user = this.state.user;
    if (user.id) {
      user_links = [
        <li>
          <a href="" onClick={this.handleLogOut}>
            <i className="glyphicon glyphicon-off"></i>
          </a>
        </li>,
        <li>
          <Link to="/account/">
            <i className="glyphicon glyphicon-user"></i> {user.display_name}
          </Link>
        </li>
      ];
    } else {
      user_links = <li>
        <a href="/login/">
          <i className="glyphicon glyphicon-user"></i> Login
        </a>
      </li>;
    }
    var homeLink = window.loggedIn ? '/dash/' : '/';
    return (
      <Navbar inverse fixedTop>
        <div className="navbar-header">
          <NavbarBrand>
            <Link to={homeLink}>
              <img src="/static/img/logo.png" />
            </Link>
          </NavbarBrand>
          <div className="navbar-form navbar-left">
            <div className="col-xs-8 col-sm-8 col-md-3 col-lg-4">
              <CompanySearch onSelect={this.handleCompany} />
            </div>
          </div>
          <Navbar.Toggle />
        </div>

        <Navbar.Collapse>
          <Nav eventKey={0}>
            <li className="visible-lg-block">
              <a href="http://dalal-street.in">Blog</a>
            </li>
            <li className="visible-lg-block"><a href="http://blog.screener.in">
              {this.state.user.id ? 'Change Log' : 'Features'}
            </a></li>
            <li><Link to="/talks/">Talks</Link></li>
            <li><Link to="/screens/">Screens</Link></li>
            <li><Link to="/watchlist/">Watchlist</Link></li>
          </Nav>
          <Nav pullRight>
            {user_links}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
});

module.exports.Navigation = Navigation;
module.exports.Footer = Footer;
