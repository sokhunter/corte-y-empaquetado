import React from "react";

function Layout(props) {
  return (
    <React.Fragment>
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img
            src=""
            width="30"
            height="30"
            class="d-inline-block align-top"
            alt=""
          />
          Proyecto
        </a>
      </nav>
      <div className="container">{props.children}</div>
      <div>Todos los derechos reservados Copyright 2019</div>
    </React.Fragment>
  );
}

export default Layout;
