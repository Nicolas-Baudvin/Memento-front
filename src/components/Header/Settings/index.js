import React, { useState } from "react";
import {
  Modal, Header, Icon, Popup
} from 'semantic-ui-react';
import { Button, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";
import PersonIcon from '@material-ui/icons/Person';
import { settingsNav } from '../../../Utils/navs';
import { updatePassword } from "../../../store/Registration/actions";
import { failMessage } from "../../../store/Popup/actions";

// Icons

// Styles
import "./style.scss";

// Components
import EditUsername from './changeUsername';
import EditPassword from './changePassword';
import EditEmail from './changeEmail';
import DeleteAccount from './deleteAccount';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '0 1em',
    color: '#fff',
    fontSize: '1.3em'
  }
}));

export default ({
  handleOpen, isOpen, handleClose
}) => {
  const classes = useStyles();
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
    openConfirm: false
  };
  const [state, setstate] = useState(initialState);

  const handleSubmitChangePass = () => {
    const { oldPass, newPass, newPassConf } = state;

    if (!oldPass || !newPass || !newPassConf) {
      return dispatch(failMessage("Tous les champs sont obligatoires"));
    }

    return dispatch(updatePassword({ oldPass, newPass, newPassConf }));
  };

  const closeConfirm = () => {
    setstate({ ...state, openConfirm: false });
  };
  return (
    <Modal
      trigger={
        <Button className={classes.button} variant="text" onClick={handleOpen} startIcon={<PersonIcon />}>
          Mon compte
        </Button>
      }
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
              state.currentMenu === "Mon Compte" && <EditUsername state={state} setstate={setstate} />
            }
            {
              state.currentMenu === "Changer de mot de passe" && <EditPassword state={state} setstate={setstate} handleSubmitChangePass={handleSubmitChangePass} />
            }
            {
              state.currentMenu === "Changer d'email" && <EditEmail state={state} setstate={setstate} />
            }
            {
              state.currentMenu === "Supprimer mon compte" && <DeleteAccount state={state} setstate={setstate} closeConfirm={closeConfirm} />
            }
          </div>
        </div>


      </Modal.Content>
    </Modal>
  );
};
