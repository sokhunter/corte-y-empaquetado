import React, { Component } from "react";
import Layout from "../components/layout";
import Canvas from "../components/canvas";
import Spinner from "../components/spinner";
// eslint-disable-next-line
import { prueba, ejectScript, Material } from "../scripts/empaquetamiento";

class Home extends Component {
  state = {
    loading: false,
    piezas: 1,
    materials: []
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleClick = e => {
    this.setState({
      loading: true
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // let resultado = prueba();
    let materials = [];
    for (let i = 1; i < this.state.piezas; i++) {
      materials.push(
        new Material(this.state[i], this.state[i + this.state.piezas + 1])
      );
    }
    // console.log("materials: " + materials);
    this.setState({
      loading: false,
      materials: materials
    });
  };

  render() {
    const children = [];
    for (let i = 0; i < this.state.piezas; i += 1) {
      children.push(
        <tr key={i}>
          <th scope="row">
            <input
              className="form-control"
              type="text"
              name={`id_${i}`}
              onChange={this.handleChange}
            />
          </th>
          <td>
            <input
              className="form-control"
              type="text"
              name={`alto_${i}`}
              onChange={this.handleChange}
            />
          </td>
          <td>
            <input
              className="form-control"
              type="text"
              name={`ancho_${i}`}
              onChange={this.handleChange}
            />
          </td>
          <td>
            <input
              className="form-control"
              type="text"
              name={`cantidad_${i}`}
              onChange={this.handleChange}
            />
          </td>
        </tr>
      );
    }

    return (
      <Layout>
        <div className="row">
          <div className="col-6">
            <form onSubmit={this.handleSubmit}>
              <h3>
                <small>Plancha</small>
              </h3>

              <div className="form-row align-items-center">
                <div className="col-auto">
                  <label className="sr-only" htmlFor="planchaAlto">
                    Alto
                  </label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    id="planchaAlto"
                    placeholder="Alto"
                    name="alto"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-auto">x</div>
                <div className="col-auto">
                  <label className="sr-only" htmlFor="planchaAncho">
                    Ancho
                  </label>
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      id="planchaAncho"
                      placeholder="Ancho"
                      name="ancho"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-inline">
                <label className="my-1 mr-2" htmlFor="piezas">
                  N° de piezas
                </label>
                <select
                  name="piezas"
                  className="custom-select my-1 mr-sm-2"
                  id="piezas"
                  onChange={this.handleChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>

              <h3>
                <small>Piezas</small>
              </h3>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Alto</th>
                    <th scope="col">Ancho</th>
                    <th scope="col">Cantidad</th>
                  </tr>
                </thead>
                <tbody>{children}</tbody>
              </table>
              <button onClick={this.handleClick} className="btn btn-primary">
                Guardar
              </button>
            </form>
          </div>
          <div className="col-6">
            <h3>
              <small>Detalle del pedido</small>
            </h3>
            <Spinner active={this.state.loading} />
            <p>
              Se necesitaran <b></b> planchas para cubrir el pedido
            </p>
            <p>
              El desperdicio es de <b></b>m2 o <b></b>% del total usado
            </p>

            <div>
              <Canvas
                height={this.state.alto}
                width={this.state.ancho}
                materials={this.state.materials}
              ></Canvas>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
export default Home;
