import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { IconButton, makeStyles, Divider } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import MoreVertIcon from '@material-ui/icons/MoreVert';

// Actions
import { failMessage } from '../../../../../store/Popup/actions';
import { deleteFriend, inviteFriend } from '../../../../../store/Socket/actions';

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
  },
  menuTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '1.2em',
    cursor: 'unset',
    '&:hover': {
      backgroundColor: '#fff',
    }
  },
  'is-disabled': {
    '&:hover': {
      backgroundColor: (props) => (props.isConnected ? "rgba(0,0,0,0.04)" : "#fff"),
      cursor: (props) => (props.isConnected ? "pointer" : "not-allowed"),
      textDecoration: (props) => (props.isConnected ? "normal" : "line-through")
    }
  }
}));

export default ({ friend }) => {
  const { mytheme } = useSelector((GlobalState) => GlobalState.userData.datas);
  const { tabs } = useSelector((GlobalState) => GlobalState.mytabs);
  const classes = useStyles({ theme: mytheme, isConnected: Boolean(friend.socketID) });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickDeleteFriend = () => () => {
    dispatch(deleteFriend(friend));
    handleClose();
  };

  const sendInvitationToTab = (tab) => () => {
    if (!friend.socketID) {
      return dispatch(failMessage("Votre ami n'est pas connecté, impossible de l'inviter sur le tableau"));
    }
    return dispatch(inviteFriend(friend.socketID, true, tab));
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
        <MenuItem component="h2" className={classes.menuTitle}>
          Inviter à un tableau
        </MenuItem>
        <Divider variant="middle" />
        {
          tabs.map((tab) => <MenuItem className={classes['is-disabled']} disabled={Boolean(friend.socketID)} key={tab._id} onClick={sendInvitationToTab(tab)}> {tab.name} </MenuItem>)
        }
        <Divider variant="middle" />
        <MenuItem onClick={handleClickDeleteFriend()}>Supprimer des amis</MenuItem>
        <MenuItem className={classes.closeMenu} onClick={handleClose}>Fermer</MenuItem>
      </Menu>
    </div>
  );
};
