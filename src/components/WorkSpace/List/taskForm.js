import React, { useState } from "react";
import { TextField, Button, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import { newTask } from "../../../store/Tasks/actions";

const useStyles = makeStyles(() => ({
  input: {
    margin: '1em 0',
    resize: 'vertical',
    whiteSpace: 'pre-wrap'
  },
  button: {
    backgroundColor: (props) => props.theme.color || "#6e00c8",
    color: '#fff',
    '&:hover': {
      backgroundColor: (props) => props.theme.hovered
    }
  }
}));

const TaskForm = ({ list }) => {
  const { mytheme } = useSelector((GlobalState) => GlobalState.userData.datas);
  const classes = useStyles({ theme: mytheme });
  const dispatch = useDispatch();
  const [state, setstate] = useState({});

  const addTaskToList = (e) => {
    e.preventDefault();
    dispatch(newTask({ listId: list._id, title: state[list._id], name: list.name }));
    setstate({ ...state, [list._id]: '' });
  };

  return (
    <form onSubmit={addTaskToList} className="list-tasks-input">
      <TextField
        value={state[list._id] || ''}
        className={classes.input}
        onChange={(e) => setstate({ ...state, [list._id]: e.target.value })}
        multiline
        placeholder="Votre tâche ..."
      />
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
