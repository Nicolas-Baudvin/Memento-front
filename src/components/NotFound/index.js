import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";

import Header from '../HomePage/Header';

export default () => {

  const history = useHistory();
  const { isConnected } = useSelector((GlobalState) => GlobalState.userData);

  return (<>
    <Header />
    <div className="notFound">
      <h1>404 Page Introuvable</h1>
      <h2>La page que vous avez demandée n'existe pas.</h2>
      Retourner à ...
      <nav>
        <ul>
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
  </>
  );
};
