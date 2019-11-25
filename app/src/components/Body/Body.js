import React from "react";
import AxisContainer from "../AxisContainer/AxisContainer";
import Scatterplot from "../Scatterplot/Scatterplot";
import * as d3 from "d3";
import data from "../../data/Exoplanet.csv";

class Body extends React.Component {
  state = {
    categoryX: "P. Min Mass (EU)",
    categoryY: "P. Mass (EU)",
    data: [],
    planetNames: [],
    xAxisData: [1, 2, 3],
    yAxisData: [1, 2, 3]
  };

  componentDidMount() {
    d3.csv(data).then(data => {
      // load csv data and convert string numbers into numbers
      data.forEach(d => {
        d["P. Appar Size (deg)"] = +d["P. Appar Size (deg)"];
        d["P. Density (EU)"] = +d["P. Density (EU)"];
        d["P. ESI"] = +d["P. ESI"];
        d["P. Eccentricity"] = +d["P. Eccentricity"];
        d["P. Esc Vel (EU)"] = +d["P. Esc Vel (EU)"];
        d["P. Gravity (EU)"] = +d["P. Gravity (EU)"];
        d["P. HZA"] = +d["P. HZA"];
        d["P. HZC"] = +d["P. HZC"];
        d["P. HZD"] = +d["P. HZD"];
        d["P. HZI"] = +d["P. HZI"];
        d["P. Inclination (deg)"] = +d["P. Inclination (deg)"];
        d["P. Min Mass (EU)"] = +d["P. Min Mass (EU)"];
        d["P. Mag"] = +d["P. Mag"];
        d["P. Mass (EU)"] = +d["P. Mass (EU)"];
        d["P. Mean Distance (AU)"] = +d["P. Mean Distance (AU)"];
        d["P. Omega (deg)"] = +d["P. Omega (deg)"];
        d["P. Radius (EU)"] = +d["P. Radius (EU)"];
        d["P. Sem Major Axis (EU)"] = +d["P. Sem Major Axis (EU)"];
        d["P. SFlux Max (EU)"] = +d["P. SFlux Max (EU)"];
        d["P. SFlux Mean (EU)"] = +d["P. SFlux Mean (EU)"];
        d["P. SFlux Min (EU)"] = +d["P. SFlux Min (EU)"];
        d["P. Sem Major Axis (AU)"] = +d["P. Sem Major Axis (AU)"];
        d["P. Surf Press (EU)"] = +d["P. Surf Press (EU)"];
        d["P. Teq Max (K)"] = +d["P. Teq Max (K)"];
        d["P. Teq Mean (K)"] = +d["P. Teq Mean (K)"];
        d["P. Teq Min (K)"] = +d["P. Teq Min (K)"];
        d["S. Age (Gyrs)"] = -d["S. Age (Gyrs)"];
        d["S. Appar Mag"] = +d["S. Appar Mag"];
        d["S. DEC (deg)"] = +d["S. DEC (deg)"];
        d["S. Distance (pc)"] = +d["S. Distance (pc)"];
        d["S. Hab Zone Max (AU)"] = +d["S. Hab Zone Max (AU)"];
        d["S. Hab Zone Min (AU)"] = +d["S. Hab Zone Min (AU)"];
        d["S. Luminosity (SU)"] = +d["S. Luminosity (SU)"];
        d["S. Mag from Planet"] = +d["S. Mag from Planet"];
        d["S. Mass (SU)"] = +d["S. Mass (SU)"];
        d["S. RA (hrs)"] = +d["S. RA (hrs)"];
        d["S. Radius (SU)"] = +d["S. Radius (SU)"];
        d["S. Size from Planet (deg)"] = +d["S. Size from Planet (deg)"];
        d["S. Teff (K)"] = +d["S. Teff (K)"];
      });
      this.initializeData(data);
    });
  }

  initializeData = result => {
    // pass loaded data into state
    let xAxisData = [];
    let yAxisData = [];
    let planetNames = [];
    for (var i = 0; i < result.length; i++) {
      xAxisData.push(result[i]["P. Min Mass (EU)"]);
      yAxisData.push(result[i]["P. Mass (EU)"]);
      planetNames.push(result[i]["P. Name"]);
    }
    this.setState({
      data: result,
      xAxisData: xAxisData,
      yAxisData: yAxisData,
      planetNames: planetNames
    });
  };

  handleCategoryX = event => {
    // handle dropDown for x-axis
    this.setState(
      {
        categoryX: event.target.value
      },
      () => {
        this.updateX();
      }
    );
  };

  handleCategoryY = event => {
    // handle dropDown for y-axis
    this.setState(
      {
        categoryY: event.target.value
      },
      () => {
        this.updateY();
      }
    );
  };

  updateX = () => {
    // update selected x-axis data
    let xAxisData = [];
    for (var i = 0; i < this.state.data.length; i++) {
      xAxisData.push(this.state.data[i][`${this.state.categoryX}`]);
    }
    this.setState({ xAxisData: xAxisData });
  };

  updateY = () => {
    // update selected y-axis data
    let yAxisData = [];
    for (var i = 0; i < this.state.data.length; i++) {
      yAxisData.push(this.state.data[i][`${this.state.categoryY}`]);
    }
    this.setState({ yAxisData: yAxisData });
  };

  render() {
    return (
      <div>
        <AxisContainer
          categoryX={this.state.categoryX}
          categoryY={this.state.categoryY}
          handleCategoryX={this.handleCategoryX}
          handleCategoryY={this.handleCategoryY}
          xAxisData={this.state.xAxisData}
          yAxisData={this.state.yAxisData}
        />
        <Scatterplot
          categoryX={this.state.categoryX}
          categoryY={this.state.categoryY}
          planetNames={this.state.planetNames}
          xAxisData={this.state.xAxisData}
          yAxisData={this.state.yAxisData}
        />
      </div>
    );
  }
}

export default Body;
