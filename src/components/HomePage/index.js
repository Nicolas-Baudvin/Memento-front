import React from "react";
import "./style.scss";
import { Helmet } from 'react-helmet';

import Header from './Header';
import Body from './Body';

export default () => (<>
  <Helmet>
    <title> My Memento - Page d'accueil - Bienvenue sur My Memento</title>
    <meta charSet="utf-8" />
    <meta name="description" content="Bienvenue sur My Memento ! Nous mettons à votre disposition cette application afin de vous aider dans votre organisaton quotidienne personnelle ou professionnelle" />
    <link rel="canonical" href="https://mymemento.fr/" />
  </Helmet>
  <div className="homePage">
    <Header />
    <Body />
  </div>
</>
);
