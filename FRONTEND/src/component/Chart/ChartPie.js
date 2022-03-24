import React from "react";
import Chart from "react-apexcharts";

const ChartPie = () => {
  return (
    <Chart
      type="pie"
      width="400"
      series={[44, 55, 13, 43, 22]}
      options={{
        labels: ["A", "B", "C", "D", "E"],
        title: {
          text: "Company Rating",
          style: {
            fontSize: "16px",
            fontWeight: "bold",
          },
        },
        subtitle: {
          text: "Progress Base",
          style: {
            fontSize: "12px",
          },
        },
      }}
    />
  );
};
export default ChartPie;
