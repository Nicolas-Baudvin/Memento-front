import React, { useState } from 'react';
import { Input, Icon } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './style.scss';
import { forgotPassword } from '../../store/Registration/actions';

export default () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const backToLogin = () => history.push("/");

  const handleChange = (e) => setEmail(e.target.value);

  const handleSubmitForgotPassword = (e) => {
    e.preventDefault();
    if (email) dispatch(forgotPassword(email));
    console.log(email);
  };

  return (
    <div className="forgotPass">
      <div className="forgotPass-header">
        <a onClick={backToLogin} className="forgotPass-back"><Icon name="arrow left" /> Retour page connexion</a>
      </div>
      <h2>Mot de passe oublié</h2>
      <p>Nous vous enverrons un lien par mail pour récupérer votre mot de passe. Ce dernier expire au bout d'une heure.</p>
      <p>Ce lien est personnel. Ne le partagez surtout pas !</p>
      <p>Pensez à vérifier vos spams.</p>
      <form onSubmit={handleSubmitForgotPassword} className="forgotPass-form">
        <Input onChange={handleChange} type="email" icon="at" iconPosition="left" placeholder="exemple@exemple.com" action={{ content: "Envoyer" }} />
      </form>
    </div>
  );
};
