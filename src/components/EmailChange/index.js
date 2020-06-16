import React, { useState, useEffect } from 'react';
import './style.scss';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { failMessage, successMessage } from '../../store/Popup/actions';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { emails } = useParams();
  const [isLoading, setLoading] = useState(true);
  const { token, userID } = useSelector((GlobalState) => GlobalState.userData.datas);

  const requestChangeMail = async () => {
    try {
      const request = await axios({
        url: `${process.env.API_URL}auth/new-email/`,
        method: 'post',
        data: {
          emails,
          userID
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLoading(false);
      dispatch(successMessage(request.data.message));
      return history.push("/");
    }
    catch (e) {
      console.log(e);
      if (!e.response) {
        return dispatch(failMessage("Erreur serveur"));
      }
      dispatch(failMessage(e.response.data.errors));
      return history.push("/");
    }
  };

  const backToHome = () => history.push("/");

  useEffect(() => {
    if (!token || !userID) {
      return history.push("/");
    }
    if (!emails) {
      return history.push("/");
    }
    requestChangeMail();
  }, []);

  return (
    <div className="emailConfirm">
      <a onClick={backToHome}>Retour accueil</a>
      {
        isLoading && <img src="/assets/spinner43px.svg" alt="chargement..." />
      }
      {
        !isLoading && <p>Votre email a bien été modifié.</p>
      }
    </div>
  );
};
