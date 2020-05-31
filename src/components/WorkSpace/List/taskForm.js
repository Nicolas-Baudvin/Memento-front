import React from "react";
import { TextArea, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";

import { newTask } from "../../../store/Tasks/actions";


const TaskForm = ({ list }) => {
  const dispatch = useDispatch();

  const addTaskToList = () => (e) => {
    e.preventDefault();
    const title = e.target.querySelector('textarea').value;
    dispatch(newTask({ listId: list._id, title, name: list.name }));
    e.target.querySelector('textarea').value = '';
  };

  return (
    <form onSubmit={addTaskToList(list._id, list)} className="list-tasks-input">
      <TextArea placeholder="Votre tâche ..." />
      <Button content="Nouvelle tâche" primary icon="add" />
    </form>
  );
};

TaskForm.propTypes = {
  list: PropTypes.object.isRequired
};

export default TaskForm;
