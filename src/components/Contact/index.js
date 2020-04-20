/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import {
  Button, Icon
} from 'semantic-ui-react';
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

// styles
import "./style.scss";

// Components
import Header from './header';
import EmailInput from './emailInput';
import SubjectInput from './subjectInput';
import MessageInput from './messageInput';

export default () => {
  const history = useHistory();
  const { datas } = useSelector((GlobalState) => GlobalState.userData);
  const initialState = {
    email: datas.email || '',
    subject: '',
    message: '',
  };
  const [state, setstate] = useState(initialState);


  return (
    <main className="contact">
      <Header history={history} />
      <h1 className="contact-title">Un bug ? Une question ? Ou juste des mots gentils :) ? C'est ici que ça se passe !</h1>
      <div className="contact-bodycontainer">

        <div className="contact-right">

          <h2 className="contact-right-title">Formulaire de contact</h2>

          <form action="" className="contact-right-form">

            <EmailInput state={state} setstate={setstate} />

            <SubjectInput state={state} setstate={setstate} />

            <MessageInput state={state} setstate={setstate} />

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
