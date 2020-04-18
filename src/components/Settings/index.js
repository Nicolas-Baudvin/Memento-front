import React, { useState } from "react";
import {
  Modal, Header, Icon, Button, Input
} from 'semantic-ui-react';
import { useSelector, useDispatch } from "react-redux";
import { settingsNav } from 'src/Utils/navs';
import "./style.scss";
import { updateUsername, updatePassword, updateEmail } from "../../store/Registration/actions";
import { failMessage } from "../../store/Popup/actions";

export default ({ handleOpen, isOpen, handleClose }) => {
  const dispatch = useDispatch();
  const { datas } = useSelector(((GlobalState) => GlobalState.userData));
  const initialState = {
    currentMenu: 'Mon Compte',
    username: datas.username,
    usernameIsDisabled: true,
    oldPass: '',
    newPass: '',
    newPassConf: '',
    oldEmail: datas.email,
    newEmail: '',
  };
  const [state, setstate] = useState(initialState);

  const handleSubmitChangePass = () => {
    const { oldPass, newPass, newPassConf } = state;

    if (!oldPass || !newPass || !newPassConf) {
      return dispatch(failMessage("Tous les champs sont obligatoires"));
    }

    return dispatch(updatePassword({ oldPass, newPass, newPassConf }));
  };

  return (
    <Modal
      trigger={<li onClick={handleOpen}>Paramètres</li>}
      open={isOpen}
      onClose={handleClose}
      basic
      size="small"
      closeIcon
    >
      <Header icon="browser" content="Paramètres utilisateurs" />
      <Modal.Content>
        <div className="settings">

          <nav className="settings-menu">
            <ul className="settings-menu-list">
              {
                settingsNav.map((item) => <li
                  onClick={(e) => setstate({ ...state, currentMenu: e.target.innerText })}
                  className="settings-menu-list__item"
                  key={item.key}
                >
                  <Icon name={item.icon} size="large" />
                  {item.title}
                </li>)
              }

            </ul>
          </nav>
          <div className="settings-body">
            <h3 className="settings-title">{state.currentMenu}</h3>
            {
              state.currentMenu === "Mon Compte" && <div className="settings-body-data">
                <label className="settings-body-data-label" htmlFor="username">Votre pseudo</label>
                <div className="settings-body-data-group">

                  <Input
                    className="settings-body-data-input"
                    value={state.username}
                    disabled={state.usernameIsDisabled}
                    onChange={(e) => setstate({ ...state, username: e.target.value })}
                  />

                  <Button
                    className="settings-body-data-btn"
                    onClick={() => setstate({ ...state, usernameIsDisabled: !state.usernameIsDisabled })}
                    content="Changer"
                    primary
                  />

                </div>

                <Button icon="checkmark"
                  onClick={() => dispatch(updateUsername(state.username))}
                  className="settings-body-data-submit"
                  content="Confirmer"
                  color="green"
                />
              </div>
            }
            {
              state.currentMenu === "Changer de mot de passe" && <div className="settings-body-data">
                <label className="settings-body-data-label" htmlFor="oldpass">Votre ancien mot de passe</label>
                <Input
                  type="password"
                  icon="key"
                  placeholder="On ressort le vieux une dernière fois ..."
                  className="settings-body-data-input"
                  value={state.oldPass}
                  onChange={(e) => setstate({ ...state, oldPass: e.target.value })}
                />
                <label className="settings-body-data-label" htmlFor="newpass">Votre nouveau mot de passe</label>
                <Input
                  type="password"
                  icon="lock"
                  placeholder="Place aux jeunes !"
                  className="settings-body-data-input"
                  value={state.newPass}
                  onChange={(e) => setstate({ ...state, newPass: e.target.value })}
                />

                <label className="settings-body-data-label" htmlFor="newpassconf">Confirmez le mot de passe</label>
                <Input
                  type="password"
                  icon="lock"
                  placeholder="Hmm.. Tu es sûr ?"
                  className="settings-body-data-input"
                  value={state.newPassConf}
                  onChange={(e) => setstate({ ...state, newPassConf: e.target.value })}
                />

                <Button
                  icon="checkmark"
                  onClick={handleSubmitChangePass}
                  className="settings-body-data-submit"
                  content="Confirmer"
                  color="green"
                />
              </div>
            }
            {
              state.currentMenu === "Changer d'email" && <div className="settings-body-data">
                <label className="settings-body-data-label" htmlFor="oldpass">Votre ancien email</label>
                <Input
                  type="email"
                  icon="at"
                  placeholder="On ressort le vieux une dernière fois ..."
                  className="settings-body-data-input"
                  value={state.oldEmail}
                  onChange={(e) => setstate({ ...state, oldEmail: e.target.value })}
                />

                <label className="settings-body-data-label" htmlFor="oldpass">Votre nouvel email</label>
                <Input
                  type="email"
                  icon="at"
                  placeholder="On ressort le vieux une dernière fois ..."
                  className="settings-body-data-input"
                  value={state.newEmail}
                  onChange={(e) => setstate({ ...state, newEmail: e.target.value })}
                />

                <Button
                  onClick={() => dispatch(updateEmail({ newEmail: state.newEmail, oldEmail: state.oldEmail }))}
                  className="settings-body-data-submit"
                  content="Confirmer"
                  color="green"
                  icon="checkmark"
                />
              </div>
            }
          </div>
        </div>


      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={handleClose} inverted>
          <Icon name="close" /> Fermer
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
