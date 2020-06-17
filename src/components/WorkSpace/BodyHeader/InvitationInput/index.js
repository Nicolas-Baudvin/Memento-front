import React from 'react';
import {
  Tooltip, Paper, Button, makeStyles, InputBase, Divider
} from '@material-ui/core';
import PropTypes from 'prop-types';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    margin: '0 1em',
    [theme.breakpoints.down('sm')]: {
      width: '250px',
      margin: '1em 0',
      alignSelf: 'center'
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  button: {
    backgroundColor: '#6E00C8',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#5800A0',
    },
    [theme.breakpoints.down('sm')]: {
      width: '90px',
    },
  }
}));

const InvitationInput = ({ currentSocket, currentTab, copyToClipBoard }) => {
  const classes = useStyles();
  return (
    <Paper component="form" onSubmit={copyToClipBoard} className={classes.root}>
      <Tooltip title="Ce lien te permet d'inviter tes amis sur ton tableau">
        <HelpOutlineIcon />
      </Tooltip>
      <Divider className={classes.divider} orientation="vertical" />
      <InputBase
        className={classes.input}
        value={`https://mymemento.fr/join/${currentTab._id}/${currentSocket.invitationLink}/`}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <Button type="submit" className={classes.button} size="large" variant="contained">
        Copier
      </Button>
    </Paper>
  );
};

InvitationInput.propTypes = {
  currentSocket: PropTypes.object.isRequired,
  currentTab: PropTypes.object.isRequired
};

export default InvitationInput;
