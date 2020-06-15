import React from 'react';
import { Divider, Avatar, makeStyles, withStyles, Badge, Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';

import Search from './Search';

const useStyles = makeStyles(() => ({
  avatar: {
    backgroundColor: '#6E00C8',
  },
  divider: {
    margin: '1em 0'
  }
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      right: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const Header = ({ state, currentSocket }) => {
  const classes = useStyles();
  return (Object.keys(currentSocket).length !== 0 && (<>
    <h2 className="sideActionMenu-title">Menu</h2>
    <Divider className={classes.divider} variant="middle" />
    <Search state={state} />
    <Divider className={classes.divider} variant="middle" />
    <h2 className="sideActionMenu-subTitle">Membres Connectés</h2>
    <Divider className={classes.divider} variant="middle" />
    <h3 className="sideActionMenu-owner-title">
      Propriétaire du tableau :
      <Tooltip title={currentSocket.owner.username}>
        <Avatar className={classes.avatar}>
          {currentSocket.owner.username.substring(0, 1)}
        </Avatar>
      </Tooltip>
    </h3>
    <div className="sideActionMenu-guests">

      {
        currentSocket.guests.map((guest) => (
          <div key={guest.userData.userID} className="sideActionMenu-guests__item">
            {
              guest.isOnline ? <Tooltip title={guest.userData.username}>
                <StyledBadge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  variant="dot"
                >
                  <Avatar className={classes.avatar}>
                    {guest.userData.username.substring(0, 1)}
                  </Avatar>
                </StyledBadge>
              </Tooltip>
                : <Tooltip title={guest.userData.username}>
                  <Avatar className={classes.avatar}>
                    {guest.userData.username.substring(0, 1)}
                  </Avatar>
                </Tooltip>
            }
          </div>
        ))
      }
      {
        currentSocket.operators.map((guest) => (
          <div key={guest.userData.userID} className="sideActionMenu-guests__item">
            <Avatar className={useStyles().avatar}>
              {
                guest.isOnline && <StyledBadge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  variant="dot"
                />
              }
              {guest.userData.username.substring(0, 1)}
            </Avatar>
          </div>
        ))
      }

    </div>
  </>));
};

Header.propTypes = {
  state: PropTypes.object.isRequired,
  currentSocket: PropTypes.object.isRequired
};

export default Header;
