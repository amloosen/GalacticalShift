import { range } from "lodash";
import React, { Component } from "react";
import normalPdf from "normal-pdf";
import ReactApexChart from "react-apexcharts";

class OutcomeSlider extends React.Component{
  constructor(props) {
  super(props);
  const mu  = this.props.mu
  const sgm  = this.props.sgm
  // const mu = 50;
  // const sgm = 20;
  // const trueValue = 50;
  const trueValue = this.props.value;

  const xValues = range(0, 100,0.5);
  const yValues = xValues.map((x) => normalPdf(x, mu, sgm))
  const yValuesAdaptNew = yValues.map(function(element) {
	                     return element*1000;});

 var xValuesOutcome = new Array(200).fill(null);
 xValuesOutcome[trueValue*2] = yValuesAdaptNew[trueValue*2];

  this.state = {
    series: [
      { data: yValuesAdaptNew,
      type: "line"},
      { data: xValuesOutcome,
      type: "column"},
    ],
    options: {
      chart: {
      toolbar: {
        show: false},
        height: 350,
        type: 'line',
        zoom: {
            enabled: false}
      },
      colors: ['#d2eaf2',"#DAA520"],
      fill: {colors: ['#d2eaf2']},
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      markers: {
        size: 0
      },
      yaxis: {
        min:0,
        labels:{show: false },
        axisTicks:{
          show: false
        },
        lines: {
          show: false
        }
      },
      xaxis: {
        color:'#d2eaf2',
        // min: 0,
        // max: 100,
        tickAmount: 5,
        overwriteCategories: ['0', '25', '50', '75', '100'],
        lines: {
          show: false
        },
        axisTicks: {
          color: '#e7e6e2',
          width: 3,
          height: 10
        },
        axisBorder: {
          show: true,
          color: '#e7e6e2',
          height: 4,
        width: '100%'},
        labels: {
          rotate: 0,
          style: {
            fontSize: '20px',
            colors: ['#e7e6e2','#e7e6e2','#e7e6e2','#e7e6e2','#e7e6e2'],
            offsetX: 0,
         offsetY: 0}
        }
      },
      grid: {show: false},
      tooltip: {enabled: false},
      legend: {
      show: false}
    },
  };
}
render (){
  return (
   <div id="chart">
   <ReactApexChart options={this.state.options} series={this.state.series} type="line" width={700} height={350} align="center"/>
   </div>
  );
 };
}

export default OutcomeSlider;
