import React from "react";

function Layout(props) {
  return (
    // eslint-disable-next-line
    <React.Fragment>
      <nav className="navbar navbar-light bg-light">
        {/* <a className="navbar-brand" href="#"> */}
        <button className="navbar-brand">
          <img
            src=""
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
          Proyecto
        </button>
      </nav>
      <div className="container">{props.children}</div>
      <div>Todos los derechos reservados Copyright 2019</div>
    </React.Fragment>
  );
}

export default Layout;
