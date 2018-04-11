"use strict";
/* global require, window, document */

import React from 'react'
import classNames from 'classnames'
import Api from '../api.js'
import Chartist from 'chartist'
import {toLocalNumber} from '../components/utils.js'

var PriceChart = React.createClass({
  barI: 0,
  cid: undefined,
  params: {what: 'years', period: 3},
  ticks: [
    ['1Mth', 1, 'months'],
    ['3Mth', 3, 'months'],
    ['6Mth', 6, 'months'],
    ['1Yr', 1, 'years'],
    ['3Yr', 3, 'years'],
    ['5Yr', 5, 'years'],
    ['Max', 11, 'years'],
  ],

  getInitialState: function() {
    return {
      data: {
        "prices":[],
        "dates":[],
      },
      posX: -20,
      posY: -20,
      value: 0,
      barIdx: false,
      tickIdx: -1,
    };
  },

  componentDidMount: function() {
    this.cid = this.props.id;
    this.fetchPrices(4);
  },

  componentWillReceiveProps: function(props) {
    if(props.id != this.props.id) {
      this.cid = props.id;
      this.fetchPrices(4);
    }
  },

  changePeriod: function(tickIdx) {
    this.fetchPrices(tickIdx);
  },

  fetchPrices: function(tickIdx) {
    if(this.cid === undefined)
      return;
    var tick = this.ticks[tickIdx];
    var params = {what: tick[2], period: tick[1]};
    Api.get(Api.cid(this.cid, 'prices'), params)
      .then(function(response) {
        this.setState({data: response, tickIdx: tickIdx});
        this.updateChart();
      }.bind(this));
  },

  createBars: function(data) {
    if(data.type === 'point') {
      var line = new Chartist.Svg('line', {
        x1: data.x,
        y1: 0,
        x2: data.x,
        y2: 280,
        'ct-x': data.x,
        'ct-y': data.y,
        'ct-value': data.value.y,
        'ct-idx': this.barI++,
      }, 'ct-point-line');
      data.element.replace(line);
    }
  },

  showToolTip: function(event) {
    var el = event.target;
    this.setState({
      posX: el.getAttribute('ct-x'),
      posY: el.getAttribute('ct-y'),
      value: el.getAttribute('ct-value'),
      barIdx: el.getAttribute('ct-idx')
    });
  },

  addListeners: function() {
    var lines = document.querySelectorAll('.ct-point-line');
    for (var i = 0; i < lines.length; ++i) {
      lines[i].addEventListener('mouseover', this.showToolTip);
    }
    this.barI = 0;
  },

  updateChart: function() {
    var last = this.state.data.dates.length;
    var breaks = Math.ceil(last / 5);
    last--;
    var options = {
      showArea: true,
      showPoint: true,
      height: '300px',
      fullWidth: true,
      lineSmooth: true,
      axisX: {
        showGrid: false,
        labelInterpolationFnc: function(label, i, vals) {
          if(i === 0 || i === last || i % breaks === 0){
            return label;
          }
        }.bind(this)
      }
    };
    var data = {
      labels: this.state.data.dates,
      series: [this.state.data.prices]
    };

    if(this.chart) {
      this.chart.update(data, options);
    } else {
      this.chart = new Chartist.Line(this.refs.priceChart, data, options);
      this.chart.on('draw', this.createBars);
      this.chart.on('created', this.addListeners);
    }
  },

  render: function() {
    var x = this.state.posX + 'px';
    var y = this.state.posY + 'px';
    var display = {display: this.state.posX > 0 ? 'inherit' : 'none'};
    var lineStyle = {transform: 'translate3d(' + x + ', 0, 0)'};
    var valueStyle = {transform: 'translate3d(' + x + ', 20px, 0)'};
    var pointStyle = {transform: 'translate3d(' + x + ', ' + y + ', 0)'};
    var label = this.state.barIdx && this.state.data.dates[this.state.barIdx];
    var value = toLocalNumber(this.state.value);
    return <div className="price-chart">
      {this.renderChartOptions()}
      <div style={display}>
        <div className="chart-tip chart-value" style={valueStyle}>
          <b>{value}</b><br />
          {label}
        </div>
        <div className="chart-tip chart-line" style={lineStyle}></div>
        <div className="chart-tip chart-point" style={pointStyle}></div>
      </div>
      <div ref="priceChart" />
    </div>;
  },

  renderChartOptions: function() {
    var ticks = this.ticks.map(function(tick, idx) {
      var active = idx == this.state.tickIdx;
      var classes = classNames('btn', {
        'btn-primary': active,
        'btn-link': !active
      });
      return <button
        key={idx}
        onClick={this.changePeriod.bind(null, idx)}
        disabled={active}
        className={classes}>
          {tick[0]}
      </button>;
    }.bind(this));
    return <div>
      <div className="pull-right">
        <b>Period: </b> {ticks}
      </div>
      <div className="clearfix"></div>
    </div>;
  }
});

export default PriceChart
