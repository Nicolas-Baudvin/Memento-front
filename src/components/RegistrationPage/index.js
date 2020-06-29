import React from "react";
import { Helmet } from 'react-helmet';

// Styles
import "./style.scss";

// Components
import Registration from "../Login";
import Header from '../HomePage/Header';


export default () => (
  <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Memento - Page de connexion</title>
    </Helmet>
    <Header />
    <main className="homepage">
      <h1 className="homepage-title">Bienvenue sur <strong>My Memento</strong></h1>
      <h3 className="homepage-subtitle">Votre gestionnaire de listes de tâches !</h3>
      <div className="homepage-registration">
        <Registration />
      </div>
    </main>
  </>
);
