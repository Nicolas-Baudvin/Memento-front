import React from "react";
import cx from 'classnames';
import "./style.scss";
import HeaderPic from '../../../assets/login.webp';

export default ({ state, setstate }) => (
  <>
    <img className="form-img" src={HeaderPic} alt="connexion" />

    <div className="form-title">
      <div className={cx("form-title-underline", { right: state.currentView === "Signup" })} />

      <h2
        onClick={() => setstate({ ...state, currentView: "Login" })}
        className={cx("form-title-clickable", { "active-title": state.currentView === "Login" })}
      >
        Connexion
      </h2>

      <h2
        onClick={() => setstate({ ...state, currentView: "Signup" })}
        className={cx("form-title-clickable", { "active-title": state.currentView === "Signup" })}
      >
        Inscription
      </h2>

    </div>
  </>
);
