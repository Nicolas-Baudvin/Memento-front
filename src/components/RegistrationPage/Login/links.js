import React from "react";
import "./style.scss";
import { useHistory } from "react-router-dom";
import { Link } from '@material-ui/core';

export default ({ state, setstate }) => {
  const history = useHistory();

  const handleClickPassForgot = (e) => {
    e.preventDefault();
    history.push("/oublie-mot-de-passe/")
  };

  const handleClickChangeView = (isAccount) => (e) => {
    e.preventDefault();
    if (!isAccount) setstate({ ...state, currentView: "Signup" });
    else setstate({ ...state, currentView: "Login" });
  };


  return (<div className="form-links">
    <Link href="#" className="form-link" onClick={handleClickPassForgot}>Mot de passe oublié ?</Link>
    {
      state.currentView === "Login" && <Link href="#" onClick={handleClickChangeView(false)} className="form-link">Tu n'as pas de compte ?</Link>
    }
    {
      state.currentView === "Signup" && <Link href="#" onClick={handleClickChangeView(true)} className="form-link">Tu as déjà un compte ?</Link>
    }
  </div>
  );
};
