import React from "react";
import { Helmet } from 'react-helmet';

// Styles
import "./style.scss";

// Components
import Login from "./Login";
import Header from '../HomePage/Header';


export default () => (
  <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Memento - Page de connexion</title>
    </Helmet>
    <Header />
    <main className="registration">
      <h1 className="registration-title">Bienvenue sur <strong>My Memento</strong></h1>
      <h3 className="registration-subtitle">Votre gestionnaire de listes de tâches !</h3>
      <div className="registration-registration">
        <Login />
      </div>
    </main>
  </>
);
