import { range } from "lodash";
import normalPdf from "normal-pdf";
import ReactApexChart from "react-apexcharts";

const OutcomeSlider = (props) => {
  const xValues = range(0, 100, 0.5);
  const yValues = xValues.map((x) => normalPdf(x, props.mu, props.sgm));
  const yValuesAdapt = yValues.map(function (element) {
    return element * 1000;
  });

  const data = {
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
        color: "#1C00ff00",
        show: false,
        tickAmount: 5,
        overwriteCategories: ["0", "25", "50", "75", "100"],
        lines: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
          color: "#1C00ff00",
          opacity: 1,
          height: 4,
          width: "100%",
        },
        labels: {
          rotate: 0,
          style: {
            fontSize: "20px",
            colors: [
              "#1C00ff00",
              "#1C00ff00",
              "#1C00ff00",
              "#1C00ff00",
              "#1C00ff00",
            ],
            offsetX: 0,
            offsetY: 0,
          },
        },
      },
      grid: { show: false },
      tooltip: { enabled: false },
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

export default OutcomeSlider;
