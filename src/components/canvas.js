import React, { Component } from "react";
import { ejectScript } from "../scripts/empaquetamiento";
import {
  Material,
  Input,
  readInput,
  solve,
  getCost
} from "../scripts/empaquetamiento";

class Canvas extends Component {
  componentDidUpdate() {
    console.log(this.props);
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    if (this.props.materials != null) {
      let input = new Input();

      input = this.readInput(
        this.props.height,
        this.props.width,
        this.props.materials
      );
      ejectScript(input);
    }
  }

  readInput = (height, width, materials) => {
    let input = new Input();
    input.table = new Material("", height, width);
    materials.map(material => {
      input.materials.push(material);
    });
    return input;
  };

  render() {
    return (
      <div>
        <canvas ref="canvas" width={640} height={425} />
      </div>
    );
  }
}
export default Canvas;
