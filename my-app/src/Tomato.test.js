import React from "react";
import ReactDOM from "react-dom";
import Tomato from "./Tomato";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Tomato />, div);
  ReactDOM.unmountComponentAtNode(div);
});
