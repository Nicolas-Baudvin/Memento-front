// Dependances
import React, { useState, useEffect } from "react";
import { Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from "react-redux";

import "./style.scss";

// React Component
import Links from './links';
import Header from './header';
import EmailInput from './Inputs/email';
import PasswordInput from './Inputs/password';
import UsernameInput from './Inputs/username';
import ConfPassInput from './Inputs/confPass';

// Actions
import { submitLoginForm, submitSignupForm } from "../../store/Registration/actions";
import { failMessage } from "../../store/Popup/actions";

export default () => {
  const dispatch = useDispatch();
  const { message } = useSelector((GlobalState) => GlobalState.popup);
  const initialState = {
    currentView: "Login",
    email: '',
    password: '',
    confPass: '',
    username: ''
  };

  const [state, setstate] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const hanldeSubmitForm = (e) => {
    e.preventDefault();
    const {
      email, password, confPass, username, currentView
    } = state;

    if (currentView === "Login") {
      if (email && password) {
        dispatch(submitLoginForm({ email, password }));
        setLoading(true);
      }
      else {
        dispatch(failMessage("Tous les champs sont obligatoires"));
      }
    }
    else if (currentView === "Signup") {
      if (email && password && confPass && username) {
        dispatch(submitSignupForm({
          email, password, confPass, username
        }));
        setLoading(true);
      }
      else {
        dispatch(failMessage("Tous les champs sont obligatoires"));
      }
    }
  };

  useEffect(() => {
    if (message.length) {
      setLoading(false);
    }
  }, [message]);

  return (
    <form onSubmit={hanldeSubmitForm} className="form">

      <Header state={state} setstate={setstate} />

      <EmailInput state={state} setstate={setstate} />
      <PasswordInput state={state} setstate={setstate} />

      {
        state.currentView === "Signup" && <>
          <UsernameInput state={state} setstate={setstate} />
          <ConfPassInput state={state} setstate={setstate} />
        </>
      }

      {
        state.currentView === "Login" && <Links setstate={setstate} state={state} />
      }

      <Button loading={loading} type="submit" className="form-btn" content="Connexion" primary />

    </form>
  );
};
