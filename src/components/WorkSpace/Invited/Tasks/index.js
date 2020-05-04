import React from "react";

export default ({ tasks, listId }) => {
  return (
    <div className="tasks">
      {
        tasks.map((task) => {
          if (task.listId === listId) {
            return (
              <div key={task._id} data-order={task.order} className="tasks-item">
                {task.title}
              </div>
            );
          }
          return false;
        })
      }
    </div>
  );
};
