import React, { useState } from "react";
import { Button, makeStyles, Modal, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";
import PersonIcon from '@material-ui/icons/Person';
import { settingsNav } from '../../../Utils/navs';

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
    fontSize: '1.3em',
    '&:hover': {
      backgroundColor: 'rgba(76,0,138,0.3)'
    }
  },
  paper: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 'max-content',
    height: '400px',
    margin: '5em auto',
    boxShadow: theme.shadows[5],
    zIndex: '1000',
    overflowY: 'auto',
    borderRadius: '5px 5px 5px 5px',
  },
  buttonModale: {
    margin: '1em',
    width: '150px'
  },
  title: {
    fontSize: '2em',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: 'white',
    borderRadius: '5px 5px 0 0',
  },
  dynamicTitle: {
    fontSize: '1.5em',
    textAlign: 'center',
    margin: '1em 0',
  }
}));

export default ({
  handleOpen, isOpen, handleClose
}) => {
  const classes = useStyles();
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

  const closeConfirm = () => {
    setstate({ ...state, openConfirm: false });
  };

  const body = (<>
    <div className="modal-header">
      <Typography className={classes.title}>Paramètres utilisateurs</Typography>
    </div>
    <div className="modal-body">
      <div className="modal-content">
        <div className="settings">

          <nav className="settings-menu">
            <ul className="settings-menu-list">
              {
                settingsNav.map((item) => <li
                  onClick={(e) => setstate({ ...state, currentMenu: e.target.innerText })}
                  className="settings-menu-list__item"
                  key={item.key}
                >
                  {item.title}
                </li>)
              }

            </ul>
          </nav>
          <div className="settings-body">
            <Typography className={classes.dynamicTitle}>{state.currentMenu}</Typography>
            {
              state.currentMenu === "Mon Compte" && <EditUsername state={state} setstate={setstate} />
            }
            {
              state.currentMenu === "Changer de mot de passe" && <EditPassword state={state} setstate={setstate} />
            }
            {
              state.currentMenu === "Changer d'email" && <EditEmail state={state} setstate={setstate} />
            }
            {
              state.currentMenu === "Supprimer mon compte" && <DeleteAccount state={state} setstate={setstate} closeConfirm={closeConfirm} />
            }
          </div>
        </div>
      </div>
      <div className="modal-actions">
        <Button color="secondary" variant="contained" onClick={handleClose}>
          Fermer
        </Button>
      </div>
    </div>
  </>
  );
  return (
    <>
      {
        window.screen.width > 967 && <Button className={classes.button} variant="text" onClick={handleOpen} startIcon={<PersonIcon />}>
          Mon compte
        </Button>
      }
      <Modal
        open={isOpen}
        onClose={handleClose}
        className={classes.paper}
        aria-labelledby="Informations du compte"
        aria-describedby="Accéder à ses informations de compte"
      >
        {body}
      </Modal>
    </>
  );
};
