import { range } from "lodash";
import normalPdf from "normal-pdf";
import React from "react";
import { withRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

class Slider extends React.Component {
  constructor(props) {
    super(props);
    const xValues = range(0, 100.5, 0.5);
    const yValues = xValues.map((x) =>
      normalPdf(x, this.props.mu, this.props.sgm)
    );
    const yValuesAdapt = yValues.map(function (element) {
      return element * 1000;
    });

    this.state = {
      mu: this.props.mu,
      sgm: this.props.sgm,
      series: [{ data: yValuesAdapt }],
      options: {
        chart: {
          toolbar: {
            show: false,
          },
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        colors: ["#d2eaf2"],
        fill: { colors: ["#d2eaf2"] },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        markers: {
          size: 0,
        },
        yaxis: {
          min: 0,
          labels: { show: false },
          axisTicks: {
            show: false,
          },
          lines: {
            show: false,
          },
        },
        xaxis: {
          color: "#d2eaf2",
          tickAmount: 5,
          overwriteCategories: ["0", "25", "50", "75", "100"],
          lines: {
            show: false,
          },
          axisTicks: {
            color: "#e7e6e2",
            width: 3,
            height: 10,
          },
          axisBorder: {
            show: true,
            color: "#e7e6e2",
            height: 4,
            width: "100%",
          },
          labels: {
            rotate: 0,
            style: {
              fontSize: "20px",
              colors: ["#e7e6e2", "#e7e6e2", "#e7e6e2", "#e7e6e2", "#e7e6e2"],
              offsetX: 0,
              offsetY: 0,
            },
          },
        },
        grid: { show: false },
        tooltip: { enabled: false },
      },
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleSlider);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleSlider);
  }

  handleSlider = (event) => {
    var pressed;
    var mu = this.state.mu;
    var sgm = this.state.sgm;
    switch (event.keyCode) {
      case 32:
        let choiceTime0 = Math.round(performance.now());
        this.props.onSpacebarHit({ mu, sgm }, choiceTime0);
        this.resetSlider();
        break;
      case 39:
        this.muPlus();
        break;
      case 37:
        this.muMinus();
        break;
      case 38:
        this.sgmPlus();
        break;
      case 40:
        this.sgmMinus();
        break;
      default:
    }
  };

  muPlus = (event) => {
    if (this.state.mu === 100) {
      var mu_tmp = this.state.mu;
      this.setValue(mu_tmp, this.state.sgm);
    } else {
      var mu_tmp = this.state.mu;
      mu_tmp = mu_tmp + 1;
      this.setValue(mu_tmp, this.state.sgm);
    }
  };

  muMinus = (event) => {
    if (this.state.mu === 0) {
      var mu_tmp = this.state.mu;
      this.setValue(mu_tmp, this.state.sgm);
    } else {
      var mu_tmp = this.state.mu;
      mu_tmp = mu_tmp - 1;
      this.setValue(mu_tmp, this.state.sgm);
    }
  };

  sgmPlus = (event) => {
    var sgm_tmp = this.state.sgm;
    sgm_tmp = sgm_tmp + 10;
    this.setValue(this.state.mu, sgm_tmp);
  };

  sgmMinus = (event) => {
    if (this.state.sgm <= 10) {
      return null;
    } else {
      var sgm_tmp = this.state.sgm;
      sgm_tmp = sgm_tmp - 10;
      this.setValue(this.state.mu, sgm_tmp);
    }
  };

  resetSlider = (event) => {
    this.setState({
      sgm: 30,
      mu: 50,
    });
  };

  setValue = (mu, sgm) => {
    const xValues = range(0, 100.5, 0.5);
    const yValues = xValues.map((x) => normalPdf(x, mu, sgm));
    const yValuesAdapt_tmp = yValues.map(function (element) {
      return element * 1000;
    });
    this.setState({
      series: [{ data: yValuesAdapt_tmp }],
      sgm: sgm,
      mu: mu,
    });
  };

  render() {
    return (
      <div>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type= "line"
          height={350}
          width={700}
          align="center"
        />
      </div>
    );
  }
}
export default Slider;
