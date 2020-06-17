import React, { useState } from 'react';
import { Tooltip, Paper, Button, makeStyles, InputBase, Divider } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

// Actions
import { newList } from "../../../../store/Lists/actions";
import { failMessage } from "../../../../store/Popup/actions";

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
    margin: '0 0 .5em 0'
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
    [theme.breakpoints.down('md')]: {
      width: '90px',
    },
  }
}));

const AddListInput = ({ currentTab }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [addlist, setAddlist] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addlist && addlist.length < 30) dispatch(newList({ name: addlist, tabId: currentTab._id }));
    else dispatch(failMessage("Le titre d'une liste doit contenir entre 1 et 30 caractères"));
  };

  return (<Paper component="form" className={classes.root} onSubmit={handleSubmit}>
    <Tooltip title="Ce formulaire te permet d'ajouter une liste. Le nom doit comporter entre 1 et 30 caractères">
      <HelpOutlineIcon />
    </Tooltip>
    <Divider className={classes.divider} orientation="vertical" />
    <InputBase
      value={addlist}
      label="Nom de liste"
      onChange={(e) => setAddlist(e.target.value)}
      className={classes.input}
      placeholder="Nom de votre liste"
    />
    <Divider className={classes.divider} orientation="vertical" />
    <Button className={classes.button} size="large" type="submit" color="primary" variant="contained">
      Ajouter
    </Button>
  </Paper>
  );
};

AddListInput.propTypes = {
  currentTab: PropTypes.object.isRequired
};

export default AddListInput;
