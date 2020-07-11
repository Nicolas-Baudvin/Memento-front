import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { IconButton, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(() => ({
  buttonIcon: {
    color: (props) => props.theme.color || "#6e00c8"
  },
  closeMenu: {
    color: '#ff0000',
    fontWeight: 'bold'
  },
  iconMenu: {
    color: (props) => props.theme.color || "#6e00c8"
  }
}));

export default () => {
  const { mytheme } = useSelector((GlobalState) => GlobalState.userData.datas);
  const classes = useStyles({ theme: mytheme });
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon className={classes.iconMenu} />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          Inviter à un tableau
          <ArrowRightIcon className={classes.iconMenu} />
        </MenuItem>
        <MenuItem onClick={handleClose}>Supprimer des amis</MenuItem>
        <MenuItem className={classes.closeMenu} onClick={handleClose}>Fermer</MenuItem>
      </Menu>
    </div>
  );
};
