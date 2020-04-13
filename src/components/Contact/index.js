/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import {
  Input, Button, Icon, TextArea
} from 'semantic-ui-react';
import "./style.scss";
import { useHistory } from "react-router-dom";

export default () => {
  const history = useHistory();
  const initialState = {
    email: '',
    subject: '',
    message: '',
  };
  const [state, setstate] = useState(initialState);


  return (
    <main className="contact">
      <header>
        <nav className="contact-nav">
          <Icon onClick={() => history.push("/")} name="arrow alternate circle left" size="big" color="blue" />
          <a onClick={() => history.push("/")} className="contact-nav-links">Retour Page D'Accueil</a>
        </nav>
        {/*  TODO: Logo ici */}
      </header>
      <h1 className="contact-title">Un bug ? Une question ? Ou juste des mot gentils :) ? C'est ici que ça se passe !</h1>
      <div className="contact-bodycontainer">

        <div className="contact-right">

          <h2 className="contact-right-title">Formulaire de contact</h2>

          <form action="" className="contact-right-form">

            <label className="contact-right-form-label" htmlFor="Email">Email</label>
            <Input
              value={state.email}
              onChange={(e) => setstate({ ...state, email: e.target.value })}
              className="contact-right-form-input"
              type="email"
              name="email"
              id="email"
              placeholder="example@example.fr"
              icon="at"
            />

            <label className="contact-right-form-label" htmlFor="Sujet">Sujet</label>
            <Input
              value={state.subject}
              onChange={(e) => setstate({ ...state, subject: e.target.value })}
              className="contact-right-form-input"
              type="text"
              name="sujet"
              id="sujet"
              placeholder="Bug, Suggestions, Question..."
              size="big"
              icon="question circle"
            />

            <label className="contact-right-form-label" htmlFor="Text">Message</label>
            <TextArea
              value={state.message}
              onChange={(e) => setstate({ ...state, message: e.target.value })}
              className="contact-right-form-input"
              name="Text"
              id="Text"
              cols="30"
              rows="10"
              placeholder="Ecrivez votre message ici..."
            />

            <Button className="contact-right-form-btn" primary icon>
              <span>Envoyer</span>
              <Icon size="big" name="send" />
            </Button>

          </form>

        </div>

        <div className="contact-left" />
      </div>

    </main>
  );
};
