import { range } from "lodash";
import normalPdf from "normal-pdf";
import ReactApexChart from "react-apexcharts";

const OutcomeSliderBar = (props) => {
  const trueValue = props.value;
  const xValues = range(0, 100, 0.5);
  const yValues = xValues.map((x) => normalPdf(x, props.mu, props.sgm));
  const yValuesAdaptNew = yValues.map(function (element) {
    return element * 1000;
  });
  const xValuesOutcome = new Array(200).fill(null);
  xValuesOutcome[trueValue * 2] = yValuesAdaptNew[trueValue * 2];

  const data = {
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
  //

  return (
    <div>
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="line"
        height={350}
        width={700}
        align="center"
      />
    </div>
  );
};
export default OutcomeSliderBar;
