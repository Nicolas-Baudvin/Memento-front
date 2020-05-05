import React from "react";
import { TextArea, Button } from 'semantic-ui-react';

export default ({ addTaskToList, list }) => {
  return (
    <form onSubmit={addTaskToList(list._id)} className="list-tasks-input">
      <TextArea placeholder="Votre tâche ..." />
      <Button content="Nouvelle tâche" primary icon="add" />
    </form>
  );
};
