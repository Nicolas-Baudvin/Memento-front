import React, { useState } from "react";
import {
  Button,
  makeStyles,
  Modal,
  Typography
} from '@material-ui/core';
import { useSelector } from "react-redux";
import PersonIcon from '@material-ui/icons/Person';

// Utils
import { settingsNav } from '../../../Utils/navs';

// Styles
import "./style.scss";

// Components/
import Content from './Content';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '0 1em',
    color: '#fff',
    fontSize: '1.3em',
    '&:hover': {
      backgroundColor: 'rgba(76,0,138,0.3)'
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
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
    <div style={{ backgroundColor: datas.mytheme || "6e00c8" }} className="modal-header">
      <Typography className={classes.title}>Paramètres utilisateurs</Typography>
    </div>
    <div className="modal-body">
      <Content
        state={state}
        setstate={setstate}
        settingsNav={settingsNav}
        closeConfirm={closeConfirm}
        classes={classes}
      />
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

      <Button className={classes.button} variant="text" onClick={handleOpen} startIcon={<PersonIcon />}>
        Mon compte
      </Button>

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
