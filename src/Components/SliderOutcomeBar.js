import React from "react";
import { range } from "lodash";
import normalPdf from "normal-pdf";
import styles from "./style/taskStyle.module.css";
import { StyleSheet, View } from "react-native-web";
import ReactApexChart from "react-apexcharts";
import OutcomeSlider from "./SliderOutcome";

class OutcomeSliderBar extends React.Component {
  constructor(props) {
    super(props);

    const trueValue = this.props.value; //debug
    const xValues = range(0, 100, 0.5);
    const yValues = xValues.map((x) =>
      normalPdf(x, this.props.mu, this.props.sgm)
    ); //debug
    const yValuesAdaptNew = yValues.map(function (element) {
      return element * 1000;
    });
    const xValuesOutcome = new Array(200).fill(null);
    var height_tmp = yValuesAdaptNew[trueValue * 2];
    xValuesOutcome[trueValue * 2] = height_tmp;

    this.state = {
      height_bar: height_tmp,
      mu: this.props.mu,
      sgm: this.props.sgm,
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
        fill: { colors: ["#d2eaf2", "#DAA520"] },
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
          tickAmount: 20,
          overwriteCategories: [
            "0",
            "5",
            "10",
            "15",
            "20",
            "25",
            "30",
            "35",
            "40",
            "45",
            "50",
            "55",
            "60",
            "65",
            "70",
            "75",
            "80",
            "85",
            "90",
            "95",
            "100",
          ],
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
              colors: [
                "#e7e6e2",
                "#1C00ff00",
                "#e7e6e2",
                "#1C00ff00",
                "#e7e6e2",
                "#1C00ff00",
                "#e7e6e2",
                "#1C00ff00",
                "#e7e6e2",
                "#1C00ff00",
                "#e7e6e2",
                "#1C00ff00",
                "#e7e6e2",
                "#1C00ff00",
                "#e7e6e2",
                "#1C00ff00",
                "#e7e6e2",
                "#1C00ff00",
                "#e7e6e2",
                "#1C00ff00",
                "#e7e6e2",
              ],
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
    }, 2000);
  }

  componentWillUnmount() {
    clearTimeout();
  }

  render() {
    const { options, series } = this.state;

    return (
      <View style={stylesSliderRep.container}>
        <View style={stylesSliderRep.header}>
          <OutcomeSlider
            mu={this.state.mu} //debug
            sgm={this.state.sgm} //debug
            height={this.props.distHeight}
          />
        </View>
        <View style={stylesSliderRep.circle}>
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height={this.props.distHeight}
            width="800px"
            align="center"
          />
        </View>
      </View>
    );
  }
}
export default OutcomeSliderBar;

const stylesSliderRep = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    position: "relative",
  },
  circle: {
    width: "100%",
    position: "absolute",
  },
});
