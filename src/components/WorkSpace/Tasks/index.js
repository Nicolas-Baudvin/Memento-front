import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./style.scss";

// components
import { Input } from "semantic-ui-react";
import Menu from './Menu';
import { updateTaskName } from "../../../store/Tasks/actions";

export default ({ tasks, listId }) => {
  const dispatch = useDispatch();
  const initialState = {
    value: ''
  };

  console.log("dans composant task",tasks);

  const [state, setstate] = useState(initialState);

  const handleSubmit = (taskId) => (e) => {
    e.preventDefault();
    const title = state.value;
    if (title) dispatch(updateTaskName({ taskId, title }));
    setstate({ ...state, value: '' });

    e.target.classList.remove("show");
    e.target.previousSibling.classList.add("show");
    e.target.parentNode.firstChild.style.display = "block";
  };

  const styles = (label) => {
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

  return (
    <div className="tasks">
      {
        tasks.map((task) => {
          if (task.listId === listId) {
            return (
              <div key={task._id} data-order={task.order} className="tasks-item">
                <div className="tasks-item-label" style={styles(task.label)} />
                <p className="show">{task.title}</p>
                <form onSubmit={handleSubmit(task._id)} className="task-menu-form" action="">
                  <Input
                    placeholder="Nouveau nom"
                    size="mini"
                    value={state.value}
                    onChange={(e) => setstate({ ...state, value: e.target.value })}
                    action={
                      {
                        content: state.value ? "Envoyer" : "Retour",
                        color: state.value ? "blue" : "red",
                        type: "submit"
                      }
                    }
                  />
                </form>
                <Menu taskId={task._id} />
              </div>
            );
          }
        })
      }
    </div>
  )
};
