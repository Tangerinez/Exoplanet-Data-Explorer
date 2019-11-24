import React from "react";
import AxisContainer from "../AxisContainer/AxisContainer";
import Scatterplot from "../Scatterplot/Scatterplot";
import * as d3 from "d3";
import data from "../../data/Exoplanet.csv";

class Body extends React.Component {
  state = {
    categoryX: "P. Min Mass (EU)",
    categoryY: "P. Mass (EU)",
    planetName: "1RXS 1609 b",
    data: null,
    xAxisData: null,
    yAxisData: null
  };

  componentDidMount() {
    d3.csv(data).then(data => {
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
        d["P. Min Mass (EU)"] = +d["P. Min Mass (EU)"];
        d["P. Mag"] = +d["P. Mag"];
        d["P. Mass (EU)"] = +d["P. Mass (EU)"];
        d["P. Mean Distance (AU)"] = +d["P. Mean Distance (AU)"];
        d["P. SFlux Max (EU)"] = +d["P. SFlux Max (EU)"];
        d["P. SFlux Mean (EU)"] = +d["P. SFlux Mean (EU)"];
        d["P. SFlux Min (EU)"] = +d["P. SFlux Min (EU)"];
        d["P. Sem Major Axis (AU)"] = +d["P. Sem Major Axis (AU)"];
        d["P. Surf Press (EU)"] = +d["P. Surf Press (EU)"];
        d["P. Teq Max (K)"] = +d["P. Teq Max (K)"];
        d["P. Teq Mean (K)"] = +d["P. Teq Mean (K)"];
        d["P. Teq Min (K)"] = +d["P. Teq Min (K)"];
        d["S. Age (Gyrs)"] = +d["S. Age (Gyrs)"];
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
      this.updateData(data);
    });
  }

  updateData = result => {
    let xStartingData = [];
    let yStartingData = [];
    for (var i = 0; i < result.length; i++) {
      xStartingData.push(result[i]["P. Min Mass (EU)"]);
      yStartingData.push(result[i]["P. Mass (EU)"]);
    }
    this.setState({
      data: result,
      xAxisData: xStartingData,
      yAxisData: yStartingData
    });
  };

  handleCategoryX = event => {
    this.setState({
      categoryX: event.target.value
    });
  };

  handleCategoryY = event => {
    this.setState({
      categoryY: event.target.value
    });
  };

  render() {
    console.log(this.state.data);
    console.log(this.state.xAxisData);
    console.log(this.state.yAxisData);
    return (
      <div>
        <AxisContainer
          categoryX={this.state.categoryX}
          categoryY={this.state.categoryY}
          handleCategoryX={this.handleCategoryX}
          handleCategoryY={this.handleCategoryY}
        />
        <Scatterplot
          categoryX={this.state.categoryX}
          categoryY={this.state.categoryY}
        />
      </div>
    );
  }
}

export default Body;
