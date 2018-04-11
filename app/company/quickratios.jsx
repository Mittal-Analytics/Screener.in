"use strict";
import React from 'react'
import {Link} from 'react-router'
import Api from '../api.js'
import {withUnit} from '../components/utils.js'
import RatioSearch from '../components/ratio.search.jsx'
import QuickRatiosModal from '../modals/quickratios.modal.jsx'


var QuickRatios = React.createClass({
  getInitialState: function() {
    return {
      quickratios: [],
    };
  },

  componentDidMount: function() {
    this.fetchQuickRatios(this.props.wid);
  },

  componentWillReceiveProps: function(props) {
    if(props.wid != this.props.wid) {
      this.fetchQuickRatios(props.wid);
    }
  },

  fetchQuickRatios: function(wid) {
    if(!window.loggedIn)
      return;
    Api.get(Api.cid(wid, 'user_ratios'))
      .then(function(response) {
        this.setState({quickratios: response});
      }.bind(this));
  },

  handleRatioAdd: function(ratio) {
    Api.get(Api.cid(this.props.wid, 'ratio'), {q: ratio.name})
      .then(function(response) {
        var quickratios = this.state.quickratios.concat([response.ratio]);
        this.setState({quickratios: quickratios});
      }.bind(this));
  },

  handleModalClose: function() {
    this.fetchQuickRatios(this.props.wid);
  },

  render: function() {
    var quickratios = this.state.quickratios;
    var values = quickratios.map(function(ratio, idx) {
      return <h4 className="col-sm-4" key={idx}>
        {ratio[0]}: {withUnit(ratio[1], ratio[2])}
      </h4>;
    });

    var login = window.loggedIn ? '' : (
      <h4 className="col-sm-4">
        Please <Link to="/register/">register</Link> to use this powerful feature.
      </h4>
    );

    var modalButton = <QuickRatiosModal
      items={quickratios}
      onClose={this.handleModalClose}
    />;
    var helpText = (
      <span>
        Type in a ratio name and we will instantly calculate it for you.
      </span>
    );
    var manage = quickratios.length > 0 ? modalButton : helpText;

    return <div>
      {values}
      <h4 className="col-sm-4">Quick Ratio Lookup:</h4>
      <div className="col-sm-4">
        <RatioSearch onSelect={this.handleRatioAdd} />
      </div>
      <div className="col-sm-4">
        {manage}
      </div>
      {login}
      <div className="clearfix" />
    </div>;
  }
});

export default QuickRatios
