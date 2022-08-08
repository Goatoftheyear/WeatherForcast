import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../Components/App";
import axios from "axios";

test("renders if render things are on the screen", () => {
  const screen = render(<App />);
  expect(screen.getByText("Weather Forecast"));
  expect(screen.getByAltText("sgMap"));
  expect(
    screen.getByRole("combobox", {
      Name: "",
    })
  );
  expect(
    screen.getByRole("button", {
      Name: "Open",
    })
  );
  expect(screen.getAllByPlaceholderText("Select a location"));
});

test("renders if render things are on the screen", async () => {
  const minimumDigits = (number) => {
    return number.toLocaleString(undefined, {
      minimumIntegerDigits: 2,
    });
  };
  var data;
  var currentTime = new Date();
  var currentTimeString =
    currentTime.getFullYear() +
    "-" +
    minimumDigits(currentTime.getMonth() + 1) +
    "-" +
    minimumDigits(currentTime.getDate()) +
    "T" +
    minimumDigits(currentTime.getHours()) +
    ":" +
    minimumDigits(currentTime.getMinutes()) +
    ":" +
    minimumDigits(currentTime.getSeconds());
  await axios
    .get(
      `https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${currentTimeString}`
    )
    .then((res) => {
      data = res.data;
    })
    .catch((error) => console.log(error));
  expect(data.api_info.status).toEqual("healthy");
});
