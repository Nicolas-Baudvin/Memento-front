import React from "react";
import PropTypes from 'prop-types';

import "./style.scss";
import { Tooltip } from "@material-ui/core";

// components
import { Draggable } from "react-beautiful-dnd";
import Menu from './Menu';

export const styles = (label) => {
  if (!label) return {};

  switch (label) {
    case "red": {
      return {
        backgroundColor: "#db2828"
      };
    }
    case "green": {
      return {
        backgroundColor: "#21ba45"
      };
    }
    case "blue": {
      return {
        backgroundColor: "#2185d0"
      };
    }
    default: {
      return {};
    }
  }
};

export const checkImportance = (color) => {
  switch (color) {
    case "red": {
      return "Importance forte";
    }
    case "green": {
      return "Importance Faible";
    }
    case "blue": {
      return "Importance Moyenne";
    }
    default: {
      return "Aucun label défini";
    }
  }
};

const Tasks = ({ tasks, list, isPublic }) => (
  tasks.sort((a, b) => a.order - b.order).map((task) => task.listId === list._id
    && <Draggable isDragDisabled={isPublic} index={task.order} key={task._id} draggableId={task._id}>
      {
        (provided) => <div
          style={{ backgroundColor: provided.isDraggingOver ? 'blue' : 'white' }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          data-order={task.order}
          className="tasks-item"
        >
          <Tooltip title={`${checkImportance(task.label)}`}>
            <div className="tasks-item-label" style={styles(task.label)} />
          </Tooltip>

          <div className="tasks-item-main">
            <p style={{ whiteSpace: 'pre-wrap' }} className="show">{task.title}</p>
            {
              !isPublic && <Menu taskId={task._id} task={task} list={list} />
            }
          </div>
          {
            task.assigned && <div className="tasks-item-assigned">Assignée à <span> {task.assigned} </span></div>
          }
        </div>
      }
    </Draggable>));

Tasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  list: PropTypes.object.isRequired,
  isPublic: PropTypes.bool.isRequired
};

export default Tasks;
