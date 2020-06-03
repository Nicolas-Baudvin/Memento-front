import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import Tasks from '../../Tasks';
import TaskForm from '../../../List/taskForm';


export default ({ fTasks, list, sortedTasks, isOp }) => {
  return <div className="list-tasks">
    {
      fTasks.length > 0 && <Droppable droppableId={list._id} type="task" direction="vertical">
        {
          (provided) => <div ref={provided.innerRef} {...provided.droppableProps} className="tasks">
            <Tasks isOp={isOp} tasks={sortedTasks} list={list} />
            {provided.placeholder}
          </div>
        }
      </Droppable>
    }
    {
      isOp && <TaskForm list={list} />
    }
  </div>;
};
