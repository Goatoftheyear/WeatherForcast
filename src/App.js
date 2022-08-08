import "./App.css";
import axios from "axios";
import React, { Component } from "react";
import sgMap from "./assets/SGMAP.png";
import { Autocomplete, TextField } from "@mui/material";
import Marker from "./Marker";
class App extends Component {
  state = {
    location: [],
    coordinates: [],
    nameArray: [],
    selected: "",
  };
  componentDidMount() {
    // format the time to fit the api
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
          return (temp = [...temp, res.data.area_metadata[index].name]);
        });
        this.setState({ nameArray: temp });
      })
      .catch((error) => console.log(error));
  }
  //numbers are based on estimation
  renderList = () => {
    const middle = [103.8198, 1.3521];
    const middleCoord = [-80, 235];
    return this.state.coordinates.map((place, index) => {
      var differenceX = middle[0] - place.label_location.longitude;
      var differenceY = middle[1] - place.label_location.latitude;
      return (
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
      <div className="App">
        <div className="header">
          <h1>Weather Forecast</h1>
          <p>Hover the marker to see the weather</p>
        </div>
        <div className="center">
          <Autocomplete
            className="search"
            multiple
            autoHighlight
            onChange={(event, value) => {
              this.setState({ selected: value });
            }}
            style={{ backgroundColor: "white" }}
            options={this.state.nameArray}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Select a location" />
            )}
          />
          {this.renderList()}
          <img src={sgMap} alt="sgMap" />
        </div>
      </div>
    );
  }
}

export default App;
