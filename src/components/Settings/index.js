import React, { useState } from "react";
import {
  Modal, Header, Icon, Button, Input
} from 'semantic-ui-react';
import { useSelector } from "react-redux";
import { settingsNav } from 'src/Utils/navs';
import "./style.scss";

export default ({ handleOpen, isOpen, handleClose }) => {
  const { datas } = useSelector(((GlobalState) => GlobalState.userData));
  const initialState = {
    currentMenu: 'Mon Compte',
    username: datas.username,
    usernameIsDisabled: true
  };
  const [state, setstate] = useState(initialState);
  console.log(state);

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
              state.currentMenu === "Mon Compte" && <div className="settings-body-data" action="">
                <label className="settings-body-data-label" htmlFor="username">Votre pseudo</label>
                <div className="settings-body-data-group">

                  <Input
                    className="settings-body-data-input"
                    value={state.username}
                    disabled={state.usernameIsDisabled}
                  />

                  <Button
                    className="settings-body-data-btn"
                    onClick={() => setstate({ ...state, usernameIsDisabled: !state.usernameIsDisabled })}
                    content="Changer"
                    primary
                  />

                </div>

                <Button className="settings-body-data-submit" content="Confirmer" color="green" />
              </div>
            }
          </div>
        </div>


      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={handleClose} inverted>
          <Icon name="checkmark" /> Fermer
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
