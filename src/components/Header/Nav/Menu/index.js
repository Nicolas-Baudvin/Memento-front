import React, { useState } from 'react';
import { Button, Menu, MenuItem, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Icons
import MenuIcon from '@material-ui/icons/Menu';

// Actions
import { logOut } from '../../../../store/Registration/actions';

// Components
import Settings from '../../Settings';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'none',
    color: '#fff',
    '&:hover': {
      backgroundColor: 'rgba(76,0,138,0.3)'
    },
    [theme.breakpoints.down("sm")]: {
      display: 'inline'
    }
  },
  closeMenu: {
    color: '#F44336'
  }
}));

export default ({ handleOpen, state, handleCloseModal }) => {
  const history = useHistory();
  const [anchor, setAnchor] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { datas } = useSelector((globalstate) => globalstate.userData);

  const handleClick = (e) => setAnchor(e.currentTarget);

  const handleClose = (e) => {
    setAnchor(null);
  };

  const handleClickLogOut = () => {
    dispatch(logOut());
    setAnchor(null);
  };

  const handleClickHome = () => {
    setAnchor(null);
    history.push("/");
  };

  const handleClickTab = () => {
    setAnchor(null);
    history.push("/vos-tableaux/");
  };

  return (
    <div>
      <Button onClick={handleClick} className={classes.root} startIcon={<MenuIcon />} />
      <Menu
        id="simple-menu"
        keepMounted
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClickHome}>Accueil</MenuItem>
        <MenuItem onClick={handleClickTab}>Tableaux</MenuItem>
        {
          datas && <MenuItem onClick={handleOpen}>Mon compte</MenuItem>
        }
        <MenuItem onClick={handleClickLogOut}>Déconnexion</MenuItem>
        <MenuItem onClick={handleClose} className={classes.closeMenu}>Fermer</MenuItem>
      </Menu>
    </div>
  );
};
