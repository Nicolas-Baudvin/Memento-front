import React from "react";
import cx from 'classnames';
import "./style.scss";

export default ({ state, setstate }) => {
  return (
    <>
      <img className="form-img" src="assets/login.jpg" alt="connexion" />

      <div className="form-title">
        <div className={cx("form-title-underline", { right: state.currentView === "Signup" })} />

        <h2
          onClick={() => setstate({ ...state, currentView: "Login" })}
          className={cx("form-title-login", { "active-title": state.currentView === "Login" })}
        >
          Connexion
        </h2>

        <h2
          onClick={() => setstate({ ...state, currentView: "Signup" })}
          className={cx("form-title-signup", { "active-title": state.currentView === "Signup" })}
        >
          Inscription
        </h2>

      </div>
    </>
  );
};
