import React, { useState } from "react";
import { Button, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import cx from 'classnames';

// Icons
import TableChartIcon from '@material-ui/icons/TableChart';
import HomeIcon from '@material-ui/icons/Home';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import PersonIcon from '@material-ui/icons/Person';

// Actions
import { logOut } from "../../../store/Registration/actions";

// Components
import Menu from './Menu';
import Settings from '../Settings';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '0 1em',
    color: '#fff',
    fontSize: '1.3em'
  },
  selectedTitle: {
    backgroundColor: 'rgba(0,0,0,0.04)'
  }
}));

export default ({
  isPublic,
  state,
  setstate
}) => {
  const { datas } = useSelector((GlobalState) => GlobalState.userData);
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [selectedTitle, setSelectedTitle] = useState();

  const handleClickDisconnect = () => dispatch(logOut());

  const handleClose = () => setstate({ ...state, isOpen: false });

  const handleOpen = () => setstate({ ...state, isOpen: true });

  const handleClickLogin = () => {
    setSelectedTitle("Signin");
    history.push("/");
  };

  const handleClickHome = () => {
    setSelectedTitle("Home");
    history.push("/");
  };

  const handleClickTab = () => {
    setSelectedTitle("Tabs");
    history.push("/vos-tableaux/");
  };

  return (
    <>
      {
        window.screen.width < 767 && <Menu />
      }
      {
        window.screen.width > 767 && <nav className="workmenu-header-nav">

          <Button
            className={cx(classes.button, selectedTitle === "Home" ? classes.selectedTitle : '')}
            variant="text"
            startIcon={<HomeIcon />}
            onClick={handleClickHome}
          >
            Accueil
          </Button>
          {
            datas && !isPublic && <Settings
              isOpen={state.isOpen}
              handleClose={handleClose}
              handleOpen={handleOpen}
            />
          }
          {
            !datas && <Button onClick={handleClickLogin} className={cx(classes.button, selectedTitle === "Signin" ? classes.selectedTitle : '')} variant="text" startIcon={<PersonIcon />}>
              Connexion/Inscription
            </Button>
          }
          {
            !isPublic && <Button
              className={cx(classes.button, selectedTitle === "Tabs" ? classes.selectedTitle : '')}
              variant="text"
              onClick={handleClickTab}
              startIcon={<TableChartIcon />}
            >
              Tableaux
            </Button>
          }
          {
            datas && <Button className={classes.button} variant="text" startIcon={<PowerSettingsNewIcon />} onClick={handleClickDisconnect}>
              Déconnexion
            </Button>
          }

        </nav>
      }
    </>
  );
};
