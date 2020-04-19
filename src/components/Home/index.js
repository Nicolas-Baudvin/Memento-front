import React, { useEffect } from "react";
import "./style.scss";

// component
import { useHistory } from "react-router-dom";
import Registration from "../Login";


export default () => {
  const history = useHistory();

  return (
    <main className="home">

      <div className="home-left">

        <div className="home-left-postit">
          <h1 className="home-left-postit-title">Bienvenue sur Memento</h1>
          <p>Votre pense-bête en ligne !</p>
          <nav className="home-left-postit-nav">
            <ul className="home-left-postit-nav-list">
              <li onClick={() => history.push("/a-propos/")} className="home-left-postit-nav-list__item">
                <a className="home-left-links"> à propos </a>
              </li>
              <li className="home-left-postit-nav-list__item">
                <a className="home-left-links"> Mentions légales </a>
              </li>
              <li onClick={() => history.push("/contact/")} className="home-left-postit-nav-list__item">
                <a className="home-left-links"> Contact </a>
              </li>
            </ul>
          </nav>
        </div>

      </div>

      <div className="home-right">
        <Registration />
      </div>

    </main>
  );
};
