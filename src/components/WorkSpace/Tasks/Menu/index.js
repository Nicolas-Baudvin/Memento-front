import React, { useState } from "react";
import { Dropdown, Icon } from 'semantic-ui-react';
import { useDispatch, useSelector } from "react-redux";
import { updateTaskLabel, deleteTask, taskAssigned } from "../../../../store/Tasks/actions";

// components
import Modal from './Modal';

export default ({ taskId, task, list }) => {
  const [state, setstate] = useState({ open: false });
  const dispatch = useDispatch();
  const { currentSocket } = useSelector((GlobalState) => GlobalState.sockets);
  const handleClickLabel = (label) => (e) => {
    dispatch(updateTaskLabel({ label, taskId, title: task.title }));
  };

  const handleClickDelete = () => {
    console.log(taskId);
    dispatch(deleteTask(taskId, list.name));
  };

  const handleClickTaskAssign = (username, selfAssign) => (e) => {
    if (selfAssign) {
      return dispatch(taskAssigned({
        taskId,
        listName: list.name,
        order: task.order
      }, selfAssign));
    }
    dispatch(taskAssigned({
      username,
      taskId,
      listName: list.name,
      order: task.order
    }));
  };

  return (
    <Dropdown closeOnEscape closeOnBlur closeOnChange item icon="cog" simple>
      <Dropdown.Menu>
        <Modal onClick={() => setstate({ ...state, menuOpen: false })} list={list} task={task} state={state} setstate={setstate} />
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
        <Dropdown.Item onClick={handleClickTaskAssign(null, true)}>S'assigner cette tâche</Dropdown.Item>
        <Dropdown.Item>
          <Icon name="dropdown" />
          <span>Assigner à ...</span>

          <Dropdown.Menu>
            {
              currentSocket && currentSocket.guests.length === 0 && <Dropdown.Item>
                Aucun invité
              </Dropdown.Item>
            }
            {
              currentSocket && currentSocket.guests.map((guest) => <Dropdown.Item key={guest.userData.username} onClick={handleClickTaskAssign(guest.userData.username, false)}>
                {guest.userData.username}
              </Dropdown.Item>)
            }
          </Dropdown.Menu>
        </Dropdown.Item>
        <Dropdown.Item onClick={handleClickDelete}>Supprimer</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
