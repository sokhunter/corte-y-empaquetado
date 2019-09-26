import React, { Component } from "react";
import { dibujarRectangulo } from "../scripts/utils";
import {
  Material,
  Input,
  readInput,
  solve,
  getCost
} from "../scripts/empaquetamiento";

class Canvas extends Component {
  componentDidUpdate() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    if (this.props.rectangulos != null) {
      this.props.rectangulos.map(rect => {
        console.log(rect.lowerLeft);
        console.log(rect.lowerLeft.x);
        dibujarRectangulo(
          ctx,
          "A",
          rect.lowerLeft.x * 10,
          rect.lowerLeft.y * 10,
          rect.upperRight.x * 10,
          rect.upperRight.y * 10
        );
      });
    }
  }

  readInput = (height, width, materials) => {
    let input = Input();
    input.table = Material("", height, width);
    materials.map(material => {
      input.materials.push(material);
    });
    return input;
  };

  readInput = () => {
    let mat = new Material();
    // let input = new Input();
    // input.table = new Material("", this.props.height, this.props.width);
    let materialsCount, count, identify;
    // cin >> materialsCount;
    //   while (materialsCount--) {
    //     //     cin >> identify >> height >> width >> count;
    //     while (count--) {
    //       input.materials.push(Material(identify, height, width));
    //     }
    //   }
    // input.materials.push(new Material("A", 5, 4));
    // input.materials.push(new Material("A", 5, 4));
    // input.materials.push(new Material("A", 5, 4));
    // input.materials.push(new Material("B", 4, 1));
    // input.materials.push(new Material("C", 7, 3));
    // input.materials.push(new Material("C", 7, 3));
    // input.materials.push(new Material("C", 7, 3));
    // input.materials.push(new Material("C", 7, 3));
    // return input;
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
