import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";

export default () => {
  const history = useHistory();
  const { isConnected } = useSelector((GlobalState) => GlobalState.userData);

  return (
    <div className="notFound">
      <img src="/assets/404-not-found.png" alt="404" />
      <h2>La page que vous avez demandé n'existe pas.</h2>
      Retourner à ...
      <nav>
        <ul>
          <li>
            <a onClick={() => history.push("/a-propos/")}>à propos</a>
          </li>

          <li>
            <a onClick={() => history.push("/mentions-legales/")}>mentions légales</a>
          </li>

          <li>
            <a onClick={() => history.push("/contact/")}>Contact</a>
          </li>

          <li>
            <a onClick={() => history.push("/")}>Page d'accueil</a>
          </li>

          <li>
            {
              isConnected && <a onClick={() => history.push("/mon-espace-de-travail/")}>Mon espace de travail</a>
            }
          </li>
        </ul>
      </nav>
    </div>
  );
};
