import React, { useState } from "react";
import "./style.scss";

// components
import { Input } from "semantic-ui-react";
import Menu from './Menu';

export default ({ tasks, listId }) => {
  const initialState = {
    value: ''
  };

  const [state, setstate] = useState(initialState);

  const handleSubmit = (taskId) => (e) => {
    e.preventDefault();
    const value = state.value;
    setstate({ ...state, value: '' });

    e.target.classList.remove("show");
    e.target.previousSibling.classList.add("show");

    // TODO: envoyer les changements
  };

  return (
    <div className="tasks">
      {
        tasks.map((task) => {
          if (task.listId === listId) {
            return (
              <div key={task._id} data-order={task.order} className="tasks-item">
                <p className="show">{task.title}</p>
                <form onSubmit={handleSubmit(task._id)} className="task-menu-form" action="">
                  <Input
                    placeholder="Nouveau nom"
                    size="mini"
                    value={state.value}
                    onChange={(e) => setstate({ ...state, value: e.target.value })}
                    action={
                      {
                        content: "Envoyer",
                        primary: true,
                        type: "submit"
                      }
                    }
                  />
                </form>
                <Menu taskId={task.id} />
              </div>
            );
          }
        })
      }
    </div>
  )
};
