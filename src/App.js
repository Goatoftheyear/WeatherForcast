import "./App.css";
import axios from "axios";
import React, { Component } from "react";
import sgMap from "./assets/SGMAP.png";
import { Autocomplete, TextField } from "@mui/material";
import Marker from "./Marker";
//left multiplier 1.68 tentative
//new left multiplier 2.08
//top multiplier 1.0
//margin-left: -73px;
//margin-top: 255px;
//JW left : -310px
//JW right : 266px
// -73 - 0.1148*100*2.08
// 255 + 0.01171*100
// const position = [103.8198, 1.3521];
// const JW = [103.705, 1.34039];
// const diff = [0.1148, 0.01171];
class App extends Component {
  state = {
    location: [],
    coordinates: [],
    nameArray: [],
    selected: "",
  };
  componentDidMount() {
    var currentTime = new Date();
    var currentTimeString =
      currentTime.getFullYear() +
      "-" +
      this.minimumDigits(currentTime.getMonth() + 1) +
      "-" +
      this.minimumDigits(currentTime.getDate()) +
      "T" +
      this.minimumDigits(currentTime.getHours()) +
      ":" +
      this.minimumDigits(currentTime.getMinutes()) +
      ":" +
      this.minimumDigits(currentTime.getSeconds());
    axios
      .get(
        `https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${currentTimeString}`
      )
      .then((res) => {
        this.setState({ coordinates: res.data.area_metadata });
        this.setState({ location: res.data.items[0].forecasts });
        var temp = [];
        res.data.area_metadata.map((area, index) => {
          temp = [...temp, res.data.area_metadata[index].name];
        });
        this.setState({ nameArray: temp });
      })
      .catch((error) => console.log(error));
  }
  onTouch = (e) => {
    console.log("ea sports");
    this.setState({ anchorEl: e.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  renderList = () => {
    return this.state.location.map((place, index) => {
      return (
        <div key={index}>
          {place.area} {place.forecast}
        </div>
      );
    });
  };
  renderList2 = () => {
    const middle = [103.8198, 1.3521];
    const middleCoord = [-73, 255];
    return this.state.coordinates.map((place, index) => {
      var differenceX = middle[0] - place.label_location.longitude;
      var differenceY = middle[1] - place.label_location.latitude;
      return (
        // -73 - 0.1148*100*2.08
        // 255 + 0.01171*100
        // <div key={index}>
        // {place.label_location.longitude} {place.label_location.latitude}
        // </div>
        <div key={index}>
          <Marker
            x={middleCoord[0] - differenceX * 1000 * 2}
            y={middleCoord[1] + differenceY * 1000 * 2}
            name={this.state.location[index].area}
            forecast={this.state.location[index].forecast}
            selected={this.state.selected}
          />
        </div>
      );
    });
  };

  minimumDigits = (number) => {
    return number.toLocaleString(undefined, {
      minimumIntegerDigits: 2,
    });
  };
  render() {
    return (
      <div>
        <div className="App-header">
          <h1>Weather Forecast</h1>
          <Autocomplete
            className="search"
            multiple
            autoHighlight
            onChange={(e, v) => {
              console.log(e);
              console.log(v);
              this.setState({ selected: v });
            }}
            style={{ backgroundColor: "white" }}
            options={this.state.nameArray}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Select a location" />
            )}
          />
          <div className="center">
            {this.renderList2()}
            <img src={sgMap} alt="sgMap" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
