import React from 'react'
import {Link} from 'react-router'
import Nav from 'react-bootstrap/lib/Nav'
import Navbar from 'react-bootstrap/lib/Navbar'
import NavbarBrand from 'react-bootstrap/lib/NavbarBrand'

import CompanySearch from './components/company.search.jsx'
import Api from './api.js'


function Footer() {
  return <footer className="footer">
    <hr />
    <span className="pull-right right-al no-print red">
      Made with <i className="glyphicon glyphicon-heart" /> in <b>India</b>.
    </span>
    <p>
      Navigation Links: <Link to="/home/">Home
      </Link> | <Link to="/screens/">Screens
      </Link> | <a href="http://blog.screener.in">Change Log
      </a> | <a href="http://dalal-street.in">Dalal-Street Blog
      </a> | <a href="https://github.com/Mittal-Analytics/Screener.in">
        View on Github
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
  </footer>;
}


class Navigation extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleCompany = this.handleCompany.bind(this);
    this.handleLogout = this.handelLogout.bind(this);
    this.state = {user: {}};
  }

  componentDidMount() {
    Api.get(Api.me).then(function(response) {
      var user = response;
      window.user = user;
      this.setState({user: user});
    }.bind(this));
  }

  handleCompany(company) {
    this.context.router.push(company.url);
  }

  handelLogout() {
    Api.logout().then(function() {
      window.loggedIn = false;
      window.user = {};
      this.setState({user: window.user});
    }.bind(this));
  }

  render() {
    var user_links;
    var user = this.state.user;
    if (user.id) {
      user_links = [
        <li key={0}>
          <a href="" onClick={this.handelLogout}>
            <i className="glyphicon glyphicon-off"></i>
          </a>
        </li>,
        <li key={1}>
          <Link to="/account/">
            <i className="glyphicon glyphicon-user"></i> {user.display_name}
          </Link>
        </li>
      ];
    } else {
      user_links = <li>
        <a href="/register/">
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
          <Nav>
            <li className="visible-lg-block">
              <a href="http://dalal-street.in">Blog</a>
            </li>
            <li className="visible-lg-block"><a href="http://blog.screener.in">
              {this.state.user.id ? 'Change Log' : 'Features'}
            </a></li>
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
}

Navigation.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export { Navigation }
export { Footer }
