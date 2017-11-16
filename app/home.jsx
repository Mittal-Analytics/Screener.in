import React from 'react'
import {Link} from 'react-router'
import CompanySearch from './components/company.search.jsx'


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
        Or Analyse: {' '}
        <Link to="company/AVANTIFEED/">Avanti Feeds</Link>,{' '}
        <Link to="company/ALLSEC/consolidated/">Allsec Tech</Link>,{' '}
        <Link to="company/HESTERBIO/">Hester Bio</Link>,{' '}
        <Link to="company/KAMATHOTEL/">Kamat Hotels</Link>,{' '}
        <Link to="company/NESCO/">NESCO</Link>,{' '}
        <Link to="company/OCCL/">Oriental Carbon</Link>,{' '}
        <Link to="company/SHILPAMED/">Shilpa Medicare</Link>,{' '}
        <Link to="company/SRIPIPES/">Srikalahasthi Pipes</Link>,{' '}
        <Link to="company/ANDHRSUGAR/">Andhra Sugars</Link> ...
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

export default Home
