import React from "react";
import cx from 'classnames';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Styles & assets
import "./style.scss";
import HeaderPic from '../../../assets/login.webp';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    padding: theme.spacing(1),
    fontWeight: 'normal',
    fontSize: window.screen.width < 767 ? "1.5em" : "2em",
    cursor: 'pointer',
    color: 'white',
    transition: 'all ease-in-out .3s',
    '&:hover': {
      color: '#dddddd',
      textDecoration: 'underline'
    }
  },
  active: {
    transform: 'scale(1.2)',
    fontWeight: 'bold',
    textDecoration: 'underline'
  }
}));

export default ({ state, setstate }) => {
  const classes = useStyles();
  return (
    <>
      <div className="form-title">
        <Typography
          color="initial"
          variant="h2"
          onClick={() => setstate({ ...state, currentView: "Login" })}
          className={cx(`"form-title-clickable" ${classes.root} ${state.currentView === "Login" ? classes.active : ''}`, { "active-title": state.currentView === "Login" })}
        >
          Connexion
        </Typography>

        <Typography
          color="initial"
          variant="h2"
          onClick={() => setstate({ ...state, currentView: "Signup" })}
          className={cx(`"form-title-clickable" ${classes.root} ${state.currentView === "Signup" ? classes.active : ''}`, { "active-title": state.currentView === "Signup" })}
        >
          Inscription
        </Typography>

      </div>
      <img className="form-img" src={HeaderPic} alt="connexion" />
    </>
  );
};
