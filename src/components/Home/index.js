import React from "react";
import { Helmet } from 'react-helmet';

// Styles
import "./style.scss";

// Components
import Registration from "../Login";
import Footer from '../Footer';


export default () => (
  <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Memento - Page de connexion</title>
      <link rel="canonical" href="https://www.mymemento.fr/" />
    </Helmet>
    <main className="home">
      <h1 className="home-title">Bienvenue sur <strong>My Memento</strong></h1>
      <h3 className="home-subtitle">Votre gestionnaire de listes de tâches !</h3>
      <div className="home-registration">
        <Registration />
      </div>
    </main>
    <Footer />
  </>
);
