import React from "react";
import { useHistory } from "react-router-dom";
import { Icon, Popup } from 'semantic-ui-react';

import "./style.scss";

export default () => {
  const history = useHistory();
  return (
    <div className="about">
      <header className="about-header">

        <nav className="about-header-nav">
          <Icon onClick={() => history.push("/")} name="arrow alternate circle left" size="big" color="blue" />
          <a onClick={() => history.push("/")} href="#" className="about-header-nav__item"> Retour Page d'Accueil </a>
        </nav>

        <Popup
          trigger={<h2 className="about-header-simple"> <strong>Simplicité</strong></h2>}
          content="Le site a été pensé afin de rendre la vie de l'utilisateur plus simple grâce à une interface claire et propre."
          openOnTriggerClick
          inverted
        />

        <Popup
          trigger={<h2 className="about-header-ergon"> <strong>Ergonomie</strong></h2>}
          content="Le site a été pensé afin de rendre la vie de l'utilisateur plus simple grâce à une interface claire et propre."
          openOnTriggerClick
          inverted
        />

        <Popup
          trigger={<h2 className="about-header-realtime"> <strong>Temps réel</strong></h2>}
          content="Vous avez la possibilitée de partager vos listes avec vos amis, collègues ou votre famille en temps réel. Une modification ? Vos invités la verront directement une fois validée !"
          openOnTriggerClick
          inverted
        />

      </header>
      <main className="about-body">
        <div className="rbn rbn-top rbn-right rbn-sticky rbn-green">à propos</div>
        <h1 className="about-body-title">Memento, qu'est ce que c'est ?</h1>

        <p className="about-body-text">
          <strong>Memento</strong> est un site, ou plutôt une <strong>application web</strong>  qui vous permet de créer des penses bêtes complexes et de les partager en temps réel avec votre famille, vos amis ou collègues.
        </p>
      </main>
    </div>
  );
};
