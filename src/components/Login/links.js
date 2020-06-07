import React from "react";
import "./style.scss";
import { useHistory } from "react-router-dom";

export default ({ state, setstate }) => {
  const history = useHistory();
  return (<>
    <a className="form-link" onClick={() => history.push("/oublie-mot-de-passe/")}>Mot de passe oublié ?</a>
    <a onClick={() => setstate({ ...state, currentView: "Signup" })} className="form-link">Tu n'as pas de compte ?</a>
  </>
  );
};
