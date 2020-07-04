import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import Tasks from '../../Tasks';
import TaskForm from '../taskForm';

export default ({ list, state, isPublic, isInvited, isOp }) => (
  <Droppable isDropDisabled={isPublic} direction="vertical" type="task" droppableId={list._id}>
    {(provided) => <div ref={provided.innerRef} className="list-tasks">
      <div className="tasks">
        <Tasks
          isPublic={isPublic}
          isInvited={isInvited}
          list={list}
          tasks={state.sortedTasks}
          listId={list._id}
          isOp={isOp}
        />
        {provided.placeholder}
      </div>

      {
        !isPublic && (!isInvited || (isInvited && isOp)) && <TaskForm
          list={list}
        />
      }
    </div>}
  </Droppable>
);
