import React from "react";
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { styles } from '../../Tasks/index';

// Components
import Menu from './Menu';

const Tasks = ({ tasks, listId }) => (
  tasks.sort((a, b) => a.order - b.order).map((task) => task.listId === listId && <Draggable key={task._id} draggableId={task._id} index={task.order}>
    {
      (provided) => <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        data-order={task.order}
        className="tasks-item"
      >
        <div className="tasks-item-label" style={styles(task.label)} />
        <div className="tasks-item-main">
          <p className="show">{task.title}</p>
          <Menu />
        </div>
        {
          task.assigned && <div className="tasks-item-assigned">Assignée à <span> {task.assigned} </span></div>
        }
      </div>
    }
  </Draggable>)
);

Tasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  listId: PropTypes.string.isRequired
};

export default Tasks;
