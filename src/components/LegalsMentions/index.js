import React from 'react';
import { useHistory } from 'react-router-dom';

// Components
import Footer from '../Footer';

// Styles
import './style.scss';

export default () => {
  const history = useHistory();

  const backToHome = () => history.push("/");

  return (
    <>
      <section className="legals">
        <a onClick={backToHome}>Retour page d'accueil</a>
        <h1>Mentions légales</h1>
        <h2>Propriétaire</h2>
        <p>
          MyMemento est pensé, designé et développé en France par Nicolas Baudvin.
        </p>
        <p>
          Ce site n'a pour but que la démonstration de compétences et n'a aucune vocation commerciale.
        </p>
        <p>
          Aucune donnée personnelle n'est vendue, ou diffusée à qui ou quoi que ce soit et sont accessibles directement sur le site par son propriétaire.
        </p>
        <p>
          Les cookies sont utilisés uniquement pour faciliter la navigation sur le site et sont obligatoires pour le bon fonctionnement de celui-ci
        </p>
        <p>
          22, allée du béguinage
          91090 Lisses
          France
        </p>
        <h2>Hébergeur</h2>
        <p>
          MyMemento est hébergé par Amazon Web Service
        </p>
        <p>
          Dont le siège social est établi
        </p>
        <p>
          Amazon Web Services, Inc.
        </p>
        <p>
          P.O. Box 81226
        </p>
        <p>
          Seattle, WA 98108-1226
        </p>
      </section>
      <Footer />
    </>
  );
};
