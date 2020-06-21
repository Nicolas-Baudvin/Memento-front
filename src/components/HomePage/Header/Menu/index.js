import React from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../../store/Registration/actions';

export default ({ classes, datas }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const contact = () => {
    window.location.href = "mailto:support@mymemento.fr";
  };

  return (
    <>
      <IconButton className={classes.menu} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MenuIcon className={classes.menuIcon} />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => history.push("/nouveautes/")}>Nouveautés</MenuItem>
        <MenuItem onClick={contact}>Contact</MenuItem>
        <MenuItem onClick={() => history.push("/mentions-legales/")}>Mentions légales</MenuItem>
        {
          datas && <MenuItem onClick={() => history.push("/vos-tableaux/")}>Vos tableaux</MenuItem>
        }
        {
          datas && <MenuItem onClick={() => dispatch(logOut())}>Déconnexion</MenuItem>
        }
        {
          !datas && <MenuItem onClick={() => history.push("/connexion/")}>Connexion</MenuItem>
        }
        <MenuItem className={classes.close} onClick={handleClose}>Fermer</MenuItem>
      </Menu>
    </>
  );
};
