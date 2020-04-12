import React from "react";
import "./style.scss";
import { useHistory } from "react-router-dom";

export default () => {
  const history = useHistory();
  return (
    <div className="about">
      <header className="about-header">

        <nav className="about-header-nav">
          <a onClick={() => history.push("/")} href="#" className="about-header-nav__item"> Retour Page d'Accueil </a>
        </nav>

        <h2 className="about-header-simple">Simplicité</h2>
        <h2 className="about-header-ergon">Ergonomie</h2>
        <h2 className="about-header-realtime">Temps réel</h2>

      </header>
      <main className="about-body">
        <div className="rbn rbn-top rbn-right rbn-sticky rbn-green">à propos</div>
        <h1 className="about-body-title">Mais qu'est donc Memento ?</h1>

        <p className="about-body-text">
          <strong>Memento</strong> est un site, ou plutôt une <strong>application web</strong>  qui vous permet de créer des penses bêtes complexes et de les partager en temps réel avec votre famille, vos amis ou collègues.
        </p>
      </main>
    </div>
  );
};
