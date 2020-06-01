import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import Tasks from '../../Tasks';

export default ({ fTasks, list, sortedTasks }) => {
  return <div className="list-tasks">
    {
      fTasks.length > 0 && <Droppable droppableId={list._id} type="task" direction="vertical">
        {
          (provided) => <div ref={provided.innerRef} {...provided.droppableProps} className="tasks">
            <Tasks tasks={sortedTasks} listId={list._id} />
            {provided.placeholder}
          </div>
        }
      </Droppable>
    }
  </div>;
};
