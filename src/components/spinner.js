import React from "react";
import "../css/spinner.css";

function Spinner(props) {
  if (!props.active) return null;
  return <div className="Spinner">Cargando...</div>;
}

export default Spinner;
