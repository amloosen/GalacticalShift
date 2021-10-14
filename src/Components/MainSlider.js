import { range } from "lodash";
import normalPdf from "normal-pdf";
import styles from "./style/taskStyle.module.css";
import React from "react";
// import { withRouter } from "react-router-dom";
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
      timesKeyDown: 0,
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
  ////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
  }

  handleKeyUp = () => {
    this.setState({ timesKeyDown: 0 });
  };

  handleKeyDown = (event) => {
    this.setState((prevState) => ({
      timesKeyDown: prevState.timesKeyDown + 1,
    }));
    var mu = this.state.mu;
    var sgm = this.state.sgm;
    switch (event.keyCode) {
      case 32:
        let choiceTime0 = Math.round(performance.now());
        this.props.onSpacebarHit({ mu, sgm }, choiceTime0);
        this.resetSlider(50,30);
        break;
      case 38:
        this.setState((prevState) => ({
          sgm: prevState.sgm + this.stepsSgm(prevState.timesKeyDown),
        }));
        this.setValue(this.state.mu, this.state.sgm);
        break;
      case 40:
      if (this.state.sgm <= 10) {
      return null;
    } else {
        this.setState((prevState) => ({
          sgm: prevState.sgm - this.stepsSgm(prevState.timesKeyDown),
        }));
        this.setValue(this.state.mu, this.state.sgm);
      }
        break;
      case 39:
      if (this.state.mu === 100) {
          var mu_tmp = this.state.mu;
          this.setValue(mu_tmp, this.state.sgm);
        } else {
          this.setState((prevState) => ({
            mu: prevState.mu + this.stepsMu(prevState.timesKeyDown),
          }));
          this.setValue(this.state.mu, this.state.sgm);
        }
        break;
      case 37:
      if (this.state.mu === 0) {
        var mu_tmp = this.state.mu;
        this.setValue(mu_tmp, this.state.sgm);
      } else {
        this.setState((prevState) => ({
          mu: prevState.mu - this.stepsMu(prevState.timesKeyDown),
        }));
        this.setValue(this.state.mu, this.state.sgm);
      }
        break;
      default:
    }
  };

  stepsSgm = (pressed) => {
    if (pressed < 10) {
      return 1;
    }else if (pressed >= 10 && pressed < 30) {
      return 10;
    }else if (pressed >= 30 && pressed < 60) {
      return 50;
    } else if (pressed >= 60 && pressed < 100) {
      return 100;
    }else if (pressed >= 100) {
      return 200;
    }
  };

  stepsMu = (pressed) => {
    if (pressed < 10) {
      return 1;
    }else if (pressed >= 10) {
      return 2;
    }
  };


  resetSlider = (mu,sgm) => {
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
      <div className={styles.main}>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={350}
          width={700}
          align="center"
        />
      </div>
    );
  }
}
export default Slider;
