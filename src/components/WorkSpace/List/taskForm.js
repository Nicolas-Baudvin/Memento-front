import React, { useState } from "react";
import { TextField, Button, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";

import { newTask } from "../../../store/Tasks/actions";

const useStyles = makeStyles(() => ({
  input: {
    margin: '1em 0',
    resize: 'vertical',
  },
  button: {
    backgroundColor: '#6E00C8',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#6100B1'
    }
  }
}));

const TaskForm = ({ list }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setstate] = useState({});

  const addTaskToList = (e) => {
    e.preventDefault();
    dispatch(newTask({ listId: list._id, title: state[list._id], name: list.name }));
    setstate({ ...state, [list._id]: '' });
  };

  return (
    <form onSubmit={addTaskToList} className="list-tasks-input">
      <TextField value={state[list._id] || ''} className={classes.input} onChange={(e) => setstate({ ...state, [list._id]: e.target.value })} multiline placeholder="Votre tâche ..." />
      <Button className={classes.button} type="submit" content="Ajouter la tâche" variant="contained">
        Ajouter la tâche
      </Button>
    </form>
  );
};

TaskForm.propTypes = {
  list: PropTypes.object.isRequired
};

export default TaskForm;
