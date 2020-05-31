import React from "react";
import "./style.scss";

export default ({ state, setstate }) => (
  <>
    <a className="form-link">Mot de passe oublié ?</a>
    <a onClick={() => setstate({ ...state, currentView: "Signup" })} className="form-link">Tu n'as pas de compte ?</a>
  </>
);
