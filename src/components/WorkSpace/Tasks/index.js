import React from "react";
import "./style.scss";

export default ({ tasks, listId, isInvited }) => {
  return (
    <div className="tasks">
      {
        tasks.map((task) => {
          console.log(task.listId === listId);
          if (task.listId === listId) {
            return (
              <div key={task._id} data-order={task.order} className="tasks-item">
                {task.title}
              </div>
            );
          }
        })
      }
    </div>
  );
};
