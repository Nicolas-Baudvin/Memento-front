import React from "react";
import { Dropdown, Icon } from 'semantic-ui-react';
import { useDispatch } from "react-redux";
import { updateTaskLabel, deleteTask } from "../../../../store/Tasks/actions";

export default ({ taskId, task, list }) => {
  const dispatch = useDispatch();

  const handleClickLabel = (label) => (e) => {
    dispatch(updateTaskLabel({ label, taskId, title: task.title }));
  };

  const handleClickChangeName = (e) => {
    const currentTask = e.target.parentNode.parentNode.parentNode; // pas fifou
    currentTask.lastChild.previousSibling.classList.add("show");
    currentTask.firstChild.nextSibling.classList.remove('show');
    currentTask.firstChild.style.display = "none";
  };

  const handleClickDelete = () => {
    console.log(taskId);
    dispatch(deleteTask(taskId, list.name));
  };

  return (
    <Dropdown item icon="cog" simple>
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleClickChangeName}>
          Modifier le nom
        </Dropdown.Item>
        <Dropdown.Item>
          <Icon name="dropdown" />
          <span>Ajouter un label...</span>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleClickLabel("red")}>
              <Icon name="circle" color="red" />
              <span>Importance forte</span>
            </Dropdown.Item>
            <Dropdown.Item onClick={handleClickLabel("blue")}>
              <Icon name="circle" color="blue" />
              <span>Importance moyenne</span>
            </Dropdown.Item>
            <Dropdown.Item onClick={handleClickLabel("green")}>
              <Icon name="circle" color="green" />
              <span>Importance Faible</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Item>
        <Dropdown.Item onClick={handleClickDelete}>Supprimer</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
