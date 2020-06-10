import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";

export default () => {

  const history = useHistory();
  const { isConnected } = useSelector((GlobalState) => GlobalState.userData);

  return (
    <div className="notFound">
      <h1>404 Page Introuvable</h1>
      <h2>La page que vous avez demandé n'existe pas.</h2>
      Retourner à ...
      <nav>
        <ul>
          <li>
            <a onClick={() => history.push("/mentions-legales/")}>mentions légales</a>
          </li>

          <li>
            <a onClick={() => history.push("/")}>Page d'accueil</a>
          </li>

          {
            isConnected && <li>
              <a onClick={() => history.push("/vos-tableaux/")}>Vos tableaux</a>
            </li>
          }
        </ul>
      </nav>
    </div>
  );
};
