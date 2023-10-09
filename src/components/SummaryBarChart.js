import React from "react";
import { Chart } from "react-google-charts";

export default function SummaryBarChart({data, options}) {


  return (
    <Chart
      chartType="ColumnChart"
      width="100%"
      height="90%"
      options={options}
      data={data}
      // data={[
      //   [
      //     "",
      //     { role: "annotation" },
      //     "Social",
      //     { role: "annotation" },
      //   ],
      //
      //   ["", "A", 98, "98"],
      //   ["", "", 98, "98"]
      // ]}
    />
  );
}