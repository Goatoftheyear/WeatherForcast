import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import Marker from "./Marker";

test("markers", () => {
  const { container } = render(
    <Marker name={"Yishun"} forecast={"Fairly Cloudy"} selected={""} />
  );
  expect(container.getElementsByClassName("dot"));
});

test("markers2", () => {
  const { container } = render(
    <Marker name={"Yishun"} forecast={"Fairly Cloudy"} selected={"Yishun"} />
  );
  expect(container.getElementsByClassName("dot2"));
});

test("markers3", () => {
  const { container } = render(
    <Marker name={"Yishun"} forecast={"Fairly Cloudy"} selected={"Boon Lay"} />
  );
  expect(container.getElementsByClassName("hidden"));
});
