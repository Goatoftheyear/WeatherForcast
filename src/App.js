import "./App.css";
import axios from "axios";
import React, { Component } from "react";

class App extends Component {
  state = { location: [] };
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
        this.setState({ location: res.data.items[0].forecasts });
      })
      .catch((error) => console.log(error));
  }
  renderList = () => {
    return this.state.location.map((place, index) => {
      return (
        <div key={index}>
          {place.area} {place.forecast}
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
        <header className="App-header">{this.renderList()}</header>
      </div>
    );
  }
}

export default App;
