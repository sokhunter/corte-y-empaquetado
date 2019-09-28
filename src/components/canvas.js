import React, { Component } from "react";
import { ejectScript } from "../scripts/empaquetamiento";
import { dibujarRectangulo } from "../scripts/utils";
import {
  Material,
  Input,
  // eslint-disable-next-line
  readInput,
  // eslint-disable-next-line
  solve,
  // eslint-disable-next-line
  getCost
} from "../scripts/empaquetamiento";

class Canvas extends Component {
  // eslint-disable-next-line
  componentDidUpdate() {
    // console.log(this.props);
    const canvas = this.refs.canvas;
    // eslint-disable-next-line
    const ctx = canvas.getContext("2d");
    if (this.props.materials != null) {
      let input = new Input();

      input = this.readInput(
        this.props.height,
        this.props.width,
        this.props.materials
      );
      let tables = [];
      tables = ejectScript(input);
      for (let i = 0; i < tables.length; i++) {
        let table = tables[i];
        if (table == null) continue;
        console.log("Table " + (i + 1));
        // table.map(material => {
        //   console.log(
        //     material.lowerLeft.x +
        //       " - " +
        //       material.upperRight.x +
        //       "<>" +
        //       material.upperRight.y +
        //       "-" +
        //       material.lowerLeft.y
        //   );
        // });
      }
    }
  }

  readInput = (height, width, materials) => {
    let input = new Input();
    input.table = new Material("", height, width);
    // eslint-disable-next-line
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
