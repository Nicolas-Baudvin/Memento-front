import React, { useState } from 'react';
import { Button, Menu, MenuItem, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Icons
import MenuIcon from '@material-ui/icons/Menu';

// Actions
import { logOut } from '../../../../store/Registration/actions';


const useStyles = makeStyles((theme) => ({
  root: {
    color: '#fff',
    '&:hover': {
      backgroundColor: 'rgba(76,0,138,0.3)'
    }
  },
  closeMenu: {
    color: '#F44336'
  }
}));

export default () => {
  const history = useHistory();
  const [anchor, setAnchor] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

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

  const handleClickMyAccount = () => {
    setAnchor(null);
    history.push("/mon-compte/");
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
        <MenuItem onClick={handleClickMyAccount}>Mon compte</MenuItem>
        <MenuItem onClick={handleClickLogOut}>Déconnexion</MenuItem>
        <MenuItem onClick={handleClose} className={classes.closeMenu}>Fermer</MenuItem>
      </Menu>
    </div>
  );
};
