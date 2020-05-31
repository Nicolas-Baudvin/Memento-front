import React from "react";
import PropTypes from 'prop-types';
import { styles } from '../../Tasks/index';

// Components
import Menu from './Menu';

const Tasks = ({ tasks, listId }) => (
  <div className="tasks">
    {
        tasks.map((task) => {
          if (task.listId === listId) {
            return (
              <div key={task._id} data-order={task.order} className="tasks-item">
                <div className="tasks-item-label" style={styles(task.label)} />
                <p className="show">{task.title}</p>
                <Menu />
              </div>
            );
          }
          return false;
        })
      }
  </div>
);

Tasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  listId: PropTypes.string.isRequired
};

export default Tasks;
