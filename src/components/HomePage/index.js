import React from "react";
import "./style.scss";
import { Helmet } from 'react-helmet';

import Header from './Header';
import Body from './Body';

export default () => (<>
  <Helmet>
    <title> My Memento - Page d'accueil - Bienvenue sur My Memento</title>
    <meta charSet="utf-8" />
    <meta name="description" content="Création de Todo lists partageables en temps réel avec ses proches ou collègues" />
    <link rel="canonical" href="https://mymemento.fr/" />
  </Helmet>
  <div className="homePage">
    <Header />
    <Body />
  </div>
</>
);
