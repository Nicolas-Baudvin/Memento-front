import React from "react";
import { styles } from '../../Tasks/index';

// Components
import Menu from './Menu';

export default ({ tasks, listId }) => (
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
