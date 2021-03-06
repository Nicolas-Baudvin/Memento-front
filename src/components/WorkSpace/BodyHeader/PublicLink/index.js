import React from 'react';
import {
  Tooltip, Paper, Button, makeStyles, InputBase, Divider
} from '@material-ui/core';

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

export default ({ currentTab, copyToClipBoard, mytheme }) => {
  const classes = useStyles({ theme: mytheme });
  const inputValue = `https://www.mymemento.fr/public/${currentTab.name}/${currentTab._id}`;
  return (<Paper className={classes.root} onSubmit={copyToClipBoard} component="form">
    <Tooltip title="Ce lien te permet d'inviter tout le monde sur ton tableau. Contrairement aux invités privés, ils n'auront aucun droit.">
      <HelpOutlineIcon />
    </Tooltip>
    <Divider className={classes.divider} orientation="vertical" />
    <InputBase
      className={classes.input}
      action={{ content: "Copier", color: "blue", onClick: copyToClipBoard }}
      value={inputValue.split(' ').join('%20')}
    />
    <Divider className={classes.divider} orientation="vertical" />
    <Button className={classes.button} type="submit" size="large" variant="contained">
      Copier
    </Button>
  </Paper>
  );
};
