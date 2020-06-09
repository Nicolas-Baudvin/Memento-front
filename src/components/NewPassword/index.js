import React, { useState, useEffect } from 'react';
import { Input, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

// Styles
import './style.scss';

// Actions
import { failMessage, successMessage } from '../../store/Popup/actions';

export default () => {
  const history = useHistory();
  const { token } = useParams();
  const dispatch = useDispatch();
  const [pass, setPass] = useState('');
  const [passConf, setPassConf] = useState('');

  const handleChangePass = (e) => setPass(e.target.value);

  const handleChangePassConf = (e) => setPassConf(e.target.value);

  const backToLogin = () => history.push("/");

  const requestServerToChangePass = async () => {
    const realToken = token.split('&').join('.'); // Problème avec React Router en laissant les points dans le token
    try {
      const result = await axios({
        method: 'post',
        url: `${process.env.API_URL}auth/new-password/`,
        data: {
          pass,
          passConf
        },
        headers: {
          Authorization: `Bearer ${realToken}`
        }
      });

      if (result.data.message) {
        dispatch(successMessage(result.data.message));
        setPass('');
        setPassConf('');
        history.push("/");
      }
    }
    catch (err) {
      dispatch(failMessage(err.response.data.errors));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pass && !passConf) {
      dispatch(failMessage("Les champs sont vides !"));
    }
    if (pass.length >= 6 && pass === passConf) {
      return requestServerToChangePass();
    }
    return dispatch(failMessage("Les mots de passe doivent être identiques"));
  };

  useEffect(() => {
    if (!token) history.push("/");
  }, []);

  return (
    <div className="recoverypass">
      <a onClick={backToLogin}><Icon name="arrow left" />Retour page de connexion</a>
      <h1>Nouveau mot de passe</h1>
      <form className="recoverypass-form" onSubmit={handleSubmit}>
        <Input type="password" onChange={handleChangePass} placeholder="6 caractères minimum" />

        <Input type="password" onChange={handleChangePassConf} placeholder="6 caractères minimum" />

        <Button content="Envoyer" icon="send" primary />
      </form>
    </div>
  );
};
