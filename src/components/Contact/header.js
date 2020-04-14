import React from "react";
import { Icon } from 'semantic-ui-react';
import "./style.scss";

export default ({ history }) => (
  <header>
    <nav className="contact-nav">
      <Icon onClick={() => history.push("/")} name="arrow alternate circle left" size="big" color="blue" />
      <a onClick={() => history.push("/")} className="contact-nav-links">Retour Page D'Accueil</a>
    </nav>
    {/*  TODO: Logo ici */}
  </header>
);
