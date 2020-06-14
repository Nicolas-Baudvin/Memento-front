import React, { useState } from 'react';
import { Button, Menu, MenuItem, makeStyles } from '@material-ui/core';

// Icons
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles((theme) => ({
  root: {
    color: "#fff"
  }
}));

export default () => {
  const [anchor, setAnchor] = useState(null);
  const classes = useStyles();

  const handleClick = (e) => setAnchor(e.currentTarget);

  const handleClose = (e) => {
    setAnchor(null);
  }

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
        <MenuItem onClick={handleClick}>Profile</MenuItem>
        <MenuItem onClick={handleClick}>My account</MenuItem>
        <MenuItem onClick={handleClick}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
