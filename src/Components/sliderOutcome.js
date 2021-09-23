import { range } from "lodash";
import React from "react";

import normalPdf from "normal-pdf";
// import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

class OutcomeSlider extends React.Component{
  render (){
  const mu  = this.props.mu
  const sgm  = this.props.sgm

  const xValues = range(0, 100,0.5)
  const yValues = xValues.map((x) => normalPdf(x, mu, sgm))
  const yValuesAdapt = yValues.map(function(element) {
	                     return element*1000;});

debugger;

  const data = {
    series: [
      { data: yValuesAdapt}
    ],
    options: {
      chart: {
      toolbar: {
        show: false},
        height: 350,
        type: 'line',
        toolbar: {
          show: false
        },
        zoom: {
            enabled: false}
      },
      colors: ['#d2eaf2'],
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
    },
  };
//
//
// //
//   function muPlus(event) {
//     if (mu==100){setMu(mu)}
//     else
//       {setMu(mu + 1)}
//     }
//
//   function muMinus(event) {
//     if (mu==0){setMu(mu)}
//     else
//     {setMu(mu - 1)}
//   }
//   function sgmPlus(event) {
//     // if (sgm>=20000){setSgm(sgm)}
//     // else
//     setSgm(sgm + 10)
//   }
//   function sgmMinus(event) {
//     if (sgm<=1){setSgm(sgm)}
//     else
//     setSgm(sgm - 1)
//   }
//
//   useEffect(() => {
//     const handler = (event) => {
//       // do something with data
//       if (event.keyCode === 32) {
//         onSpacebarHit({ mu, sgm })
//       } else if (event.keyCode === 39) {muPlus()
//
//       } else if (event.keyCode === 37) {muMinus()
//
//       } else if (event.keyCode === 38) {sgmPlus()
//
//       } else if (event.keyCode === 40) {sgmMinus()
//
//       }
//     }
//     document.addEventListener('keydown', handler)
//     return () => {
//       document.removeEventListener('keydown', handler)
//     }
//   }, [onSpacebarHit, mu, sgm])
  return (
    <div>
    <ReactApexChart options={data.options} series={data.series} type="line" height={350} width={700} align="center"/>
    </div>
  )
};
}

export default OutcomeSlider;
