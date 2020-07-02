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
    width: '400px',
    margin: '0 1em',
    [theme.breakpoints.down('md')]: {
      width: '250px',
      margin: '1em',
      alignSelf: 'center'
    },
    [theme.breakpoints.down('lg')]: {
      margin: '1em',
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
    backgroundColor: (props) => (props.theme ? props.theme.color : "#6e00c8"),
    color: '#fff',
    '&:hover': {
      backgroundColor: (props) => (props.theme ? props.theme.hovered : "#6e00c8"),
    },
    [theme.breakpoints.down('md')]: {
      width: '90px',
    },
  }
}));

const InvitationInput = ({
  currentSocket, currentTab, copyToClipBoard, mytheme
}) => {
  const classes = useStyles({ theme: mytheme });
  const inputValue = `https://mymemento.fr/join/${currentTab._id}/${currentSocket.invitationLink}/`;

  return (
    <Paper component="form" onSubmit={copyToClipBoard} className={classes.root}>
      <Tooltip title="Ce lien te permet d'inviter tes amis sur ton tableau">
        <HelpOutlineIcon />
      </Tooltip>
      <Divider className={classes.divider} orientation="vertical" />
      <InputBase
        className={classes.input}
        value={inputValue}
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
