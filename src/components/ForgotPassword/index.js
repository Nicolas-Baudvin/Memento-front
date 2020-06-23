import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../store/Registration/actions';
import { failMessage } from '../../store/Popup/actions';

import './style.scss';

export default () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { message } = useSelector((globalState) => globalState.popup);

  const backToLogin = () => history.push("/");

  const handleChange = (e) => setEmail(e.target.value);

  const handleSubmitForgotPassword = (e) => {
    e.preventDefault();
    setLoading(true);
    if (email) dispatch(forgotPassword(email));
    else dispatch(failMessage("Le mail est invalide"));
  };

  useEffect(() => {
    if (message) {
      setLoading(false);
    }
  }, [message]);

  return (
    <div className="forgotPass">
      <div className="forgotPass-header">
        <a onClick={backToLogin} className="forgotPass-back"> Retour page connexion</a>
      </div>
      <h2>Mot de passe oublié</h2>
      <p>Nous vous enverrons un lien par mail pour récupérer votre mot de passe. Ce dernier expire au bout d'une heure.</p>
      <p>Ce lien est personnel. Ne le partagez surtout pas !</p>
      <p>Pensez à vérifier vos spams.</p>
      <form onSubmit={handleSubmitForgotPassword} className="forgotPass-form">
        <TextField label="Votre email" onChange={handleChange} type="email" />
        <div className="forgotPass-submit">
          <Button variant="contained" type="submit" color="primary">
            {
              loading && <img src="/assets/spinner43px.svg" alt="chargement" />
            }
            Envoyer
          </Button>
        </div>
      </form>
    </div>
  );
};
