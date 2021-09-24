import { range } from "lodash";
import React, { Component } from "react";
import normalPdf from "normal-pdf";
import ReactApexChart from "react-apexcharts";

class BarOutcome extends React.Component {
  constructor(props) {
    super(props);
    const mu  = this.props.mu
    const sgm  = this.props.sgm
    const trueValue = this.props.value;
    // const mu = 50;
    // const sgm = 20;
    // const trueValue = 50;


    const xValues = range(0, 100,0.5);
    const yValues = xValues.map((x) => normalPdf(x, mu, sgm))
    const yValuesAdaptNew = yValues.map(function(element) {
          return element*1000;});

    var xValuesOutcome = new Array(200).fill(null);
    xValuesOutcome[trueValue*2] = yValuesAdaptNew[trueValue*2];

      this.state = {
        series: [{
          name: 'Net Profit',
          data: xValuesOutcome
        }],
        options: {
          chart: {
            toolbar: {
              show: false},
            type: 'bar',
            height: 80
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '100%',
              endingShape: 'rounded'
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ["#DAA520"],
          },
          markers: {
            size: 0
          },
          xaxis: {
            tickAmount: 5,
            lines: {
              show: false
            },
            labels:{show: false },
            axisTicks: {
              show: false
            },
            axisBorder: {
              show: false,
              color: '#e7e6e2',
              height: 4,
            width: '100%'},
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
          fill: {
            colors: ['#DAA520'],
            opacity: 1
          },
          grid: {show: false},
          tooltip: {enabled: false},
        },
      };
    }

    render() {
      return (
        <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
        </div>
      );
    }
  }

export default BarOutcome;
