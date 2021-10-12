import React from "react";
import { range } from "lodash";
import normalPdf from "normal-pdf";
import styles from "./style/taskStyle.module.css";
import { View } from "react-native";
import ReactApexChart from "react-apexcharts";
import OutcomeSlider from "./SliderOutcome";

class OutcomeSliderBar extends React.Component {
  constructor(props) {
    super(props);

    const trueValue = props.value;
    const xValues = range(0, 100, 0.5);
    const yValues = xValues.map((x) => normalPdf(x, this.props.mu, this.props.sgm));
    const yValuesAdaptNew = yValues.map(function (element) {
      return element * 1000;
    });
    const xValuesOutcome = new Array(200).fill(null);
    var height_tmp = yValuesAdaptNew[trueValue * 2];
    xValuesOutcome[trueValue * 2] = height_tmp;

    this.state = {
      height_bar: height_tmp,
      series: [
        { data: yValuesAdaptNew, type: "line" },
        { data: xValuesOutcome, type: "column" },
      ],
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
        colors: ["#1C00ff00", "#DAA520"],
        fill: { colors: ["#1C00ff00", "#DAA520"] },
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
          // min: 0,
          // max: 100,
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
        legend: { show: false },
      },
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.props.getBarHeight(this.state.height_bar);
    }, 5000);
  }

  componentWillUnmount() {
    clearTimeout();
  }

  render() {
    return (
      <View style={styles.container}>
          <div className={styles.overlaybar}>
            <OutcomeSlider
              mu={this.props.mu}
              sgm={this.props.sgm}
            />
          </div>
      <div className={styles.overlaybar}>
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={350}
          height={350}
          width={700}
          align="center"
        />
      </div>

    </div>
      </View>
    );
  }
}
export default OutcomeSliderBar;
