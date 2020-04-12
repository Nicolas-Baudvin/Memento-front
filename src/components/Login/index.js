// Dependances
import React, { useState, useEffect } from "react";
import { Input, Button, Icon } from 'semantic-ui-react';
import cx from 'classnames';

import "./style.scss";

// React Component
import AltBtn from './altBtn';
import Links from './links';
import Header from './header';
import EmailInput from './Inputs/email';
import PasswordInput from './Inputs/password';
import UsernameInput from './Inputs/username';
import ConfPassInput from './Inputs/confPass';

export default () => {
  const initialState = {
    currentView: "Login",
    email: '',
    password: '',
    confPass: '',
    username: ''
  };

  const [state, setstate] = useState(initialState);

  const hanldeSubmitForm = () => {
    if (state.currentView === "Login") {
      // Submit login data
    }
    else if (state.currentView === "Signup") {
      // submit signup data
    }
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

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
        state.currentView === "Login" && <Links />
      }

      <Button type="submit" className="form-btn" content="Connexion" primary />

      <AltBtn />

    </form>
  );
};
