import React, { Component } from "react";
import CanvasJSReact from "../../assets/canvasjs.react";

import { API_BASE } from "../../utils/Api";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function SplineChart() {
  const [states, setStates] = React.useState([]);
  const getStates = async () => {
    const response = await fetch(`${API_BASE}/states`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    result && setStates(result.data);

    //   console.log("Users", result);
  };

  const splitStatesBySix = () => {
    // let splitStates = {};
    // let splitStatesBucket = [];
    // let splitPoints = [6, 12, 18, 24, 30, 36];
    // for (let index = 0; index < states.length; index++) {
    //   Object.assign(splitStates, {
    //     type: "column",
    //     dataPoints: [{ x: 10, y: 71, label: states[index].name }],
    //   });
    //   // alert(JSON.stringify(splitStates));
    // }
    // console.group("states obj", splitStates);
  };

  const options = {
    animationEnabled: true,
    title: {
      text: "Report Analytics",
    },
    // axisX: {
    //   valueFormatString: "MMM",
    // },
    // axisY: {
    //   title: "Sales (in USD)",
    //   prefix: "$",
    //   includeZero: false,
    // },
    data: [
      {
        type: "column",
        dataPoints: [
          { x: 0, y: 0, label: '' },
          { x: 0, y: 0, label: '' },
          { x: 0, y: 0, label: '' },
          { x: 0, y: 0, label: '' },
          { x: 0, y: 0, label: '' },
          { x: 0, y: 0, label: '' },
        ]
         
      }
    ]

  };

  React.useEffect(() => {
    getStates();
  }, []);

  React.useEffect(() => {
    states && splitStatesBySix();
  }, [states]);

  return (
    <div>
      <br />
      <br />
      {/* <h1>React Spline Chart</h1> */}
      {states && states.length && (
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
      )}
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
}

export default SplineChart;
