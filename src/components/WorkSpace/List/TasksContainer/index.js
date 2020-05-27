import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import Tasks from '../../Tasks';
import TaskForm from '../taskForm';

export default ({ list, state, addTaskToList }) => {
  return (
    <Droppable direction="vertical" type="task" droppableId={list._id}>
      {(provided) => <div ref={provided.innerRef} className="list-tasks">
        <div className="tasks">
          <Tasks list={list} tasks={state.sortedTasks} listId={list._id} />
          {provided.placeholder}
        </div>

        <TaskForm
          addTaskToList={addTaskToList}
          list={list}
        />
      </div>}
    </Droppable>
  );
};
