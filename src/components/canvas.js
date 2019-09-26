import React, { Component } from "react";
import { dibujarRectangulo } from "../scripts/utils";
import { readInput, solve, getCost } from "../scripts/empaquetamiento";

class Canvas extends Component {
  componentDidUpdate() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    if (this.props.rectangulos != null) {
      this.props.rectangulos.map(rect => {
        dibujarRectangulo(
          ctx,
          "A",
          rect.xi * 10,
          rect.yi * 10,
          rect.xf * 10,
          rect.yf * 10
        );
      });
    }
  }
  render() {
    return (
      <div>
        <canvas ref="canvas" width={640} height={425} />
      </div>
    );
  }
}
export default Canvas;
