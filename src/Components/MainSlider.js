import { range } from "lodash";
import normalPdf from "normal-pdf";
import styles from "./style/taskStyle.module.css";
import React from "react";
// import { withRouter } from "react-router-dom";
import ReactApexChart from "react-apexcharts";

class Slider extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    const xValues = range(0, 100.5, 0.5);
    const yValues = xValues.map((x) =>
      normalPdf(x, this.props.mu, this.props.sgm)
    );
    const yValuesAdapt = yValues.map(function (element) {
      return element * 1000;
    });
    var distheight_tmp = Math.max.apply(null, yValuesAdapt) * 5;

    this.state = {
      timesKeyDown: 0,
      mu: this.props.mu,
      sgm: this.props.sgm,
      distHeight: distheight_tmp,
      series: [{ data: yValuesAdapt }],
      options: {
        chart: {
          toolbar: {
            show: false,
          },
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
              fontSize: "2.5vh",
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
    this._isMounted = true;
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
      this.resetSlider(50, 30);
  }

  componentWillUnmount() {
    this._isMounted = false;
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
    var distHeight = this.state.distHeight;

    switch (event.keyCode) {
      case 32:
        let choiceTime0 = Math.round(performance.now());
        this.props.onSpacebarHit({ mu, sgm }, distHeight, choiceTime0);
        if (this._isMounted) {
            this.resetSlider(50, 30);
        }

        break;
      case 40:
        this.setState((prevState) => ({
          sgm: prevState.sgm + this.stepsSgm(prevState.timesKeyDown),
        }));
        this.setValue(this.state.mu, this.state.sgm);
        break;
      case 38:
        if (this.state.sgm <= 10) {
          return null;
        } else {
          if (this.state.sgm>=16){
          this.setState((prevState) => ({
            sgm: prevState.sgm - this.stepsSgm(prevState.timesKeyDown),
          }));

          this.setValue(this.state.mu, this.state.sgm);
        }
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
    if (pressed < 10 || this.state.sgm<=21) {
      return 1;
    } else if (pressed >= 10 && pressed < 30) {
      return 10;
    } else if (pressed >= 30 && pressed < 60) {
      return 30;
    } else if (pressed >= 60 && pressed < 100) {
      return 40;
    } else if (pressed >= 100) {
      return 50;
    }
  };

  stepsMu = (pressed) => {
    if (pressed < 10) {
      return 1;
    } else if (pressed >= 10) {
      return 2;
    }
  };

  resetSlider = (mu, sgm) => {
    const xValues = range(0, 100.5, 0.5);
    const yValues = xValues.map((x) => normalPdf(x, this.props.mu, this.props.sgm));
    const yValuesAdapt_tmp = yValues.map(function (element) {
      return element * 1000;
    });
    var distheight_tmp = Math.max.apply(null, yValuesAdapt_tmp) * 5;

    this.setState({
      series: [{ data: yValuesAdapt_tmp }],
      sgm: sgm,
      mu: mu,
      distHeight: distheight_tmp
    });
  };

  setValue = (mu, sgm) => {
    const xValues = range(0, 100.5, 0.5);
    const yValues = xValues.map((x) => normalPdf(x, mu, sgm));
    const yValuesAdapt_tmp = yValues.map(function (element) {
      return element * 1000;
    });

    var distheight_tmp = Math.max.apply(null, yValuesAdapt_tmp) * 5;

    this.setState({
      series: [{ data: yValuesAdapt_tmp }],
      sgm: sgm,
      mu: mu,
      distHeight: distheight_tmp,
    });
  };

  render() {
    return (
      <div className={styles.main}>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={this.state.distHeight}
          width="800px"
          align="center"
        />
      </div>
    );
  }
}
export default Slider;
