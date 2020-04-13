import React from "react";
import "./style.scss";

export default ({ state, setstate }) => {

  return (
    <>
      <a className="form-link">Mot de passe oublié ?</a>
      <a onClick={(e) => setstate({ ...state, currentView: "Signup" })} className="form-link">Tu n'as pas de compte ?</a>
    </>
  );
};
