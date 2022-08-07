import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import Marker from "./Marker";
import userEvent from "@testing-library/user-event";

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
