import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./style.scss";

// components
import { Input, Popup } from "semantic-ui-react";
import { Draggable } from "react-beautiful-dnd";
import Menu from './Menu';
import { updateTaskName } from "../../../store/Tasks/actions";

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
      return "";
    }
  }
};

export default ({ tasks, listId, list }) => {
  const dispatch = useDispatch();
  const initialState = {
    value: ''
  };

  const [state, setstate] = useState(initialState);

  const handleSubmit = (taskId, task) => (e) => {
    e.preventDefault();
    const title = state.value;
    if (title) dispatch(updateTaskName({ taskId, title, oldName: task.title }));
    setstate({ ...state, value: '' });

    e.target.classList.remove("show");
    e.target.previousSibling.classList.add("show");
    e.target.parentNode.firstChild.style.display = "block";
  };

  return tasks.map((task) => task.listId === listId && <Draggable index={task.order} key={task._id} draggableId={task._id}>
    {
      (provided) => <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} data-order={task.order} className="tasks-item">
        <Popup
          trigger={<div className="tasks-item-label" style={styles(task.label)} />}
          content={checkImportance(task.label)}
        />
        <div className="tasks-item-main">
          <p className="show">{task.title}</p>
          <form onSubmit={handleSubmit(task._id, task)} className="task-menu-form" action="">
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
          <Menu taskId={task._id} task={task} list={list} />
        </div>
        {
          task.assigned && <div className="tasks-item-assigned">Assignée à <span> {task.assigned} </span></div>
        }
      </div>
    }
  </Draggable>);
};
