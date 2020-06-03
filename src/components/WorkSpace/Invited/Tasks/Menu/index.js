import React from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { updateTaskLabel, taskAssigned, deleteTask } from '../../../../../store/Tasks/actions';

export default ({ task, isOp, list }) => {
  const dispatch = useDispatch();
  const { currentSocket } = useSelector((GlobalState) => GlobalState.sockets);
  const { username: name } = useSelector((GlobalState) => GlobalState.userData.datas);
  const handleClickTaskAssign = (username, selfAssign) => (e) => {
    if (selfAssign)
    {
      return dispatch(taskAssigned({
        taskId: task._id,
        listName: list.name,
        order: task.order
      }, selfAssign));
    }
    return dispatch(taskAssigned({
      username,
      taskId: task._id,
      listName: list.name,
      order: task.order
    }));
  };

  const handleClickDelete = () => dispatch(deleteTask(task._id, list.name));

  const handleClickLabel = (label) => () => {
    dispatch(updateTaskLabel({ label, taskId: task._id, title: task.title }));
  };
  return (
    <Dropdown item icon="cog" simple>
      <Dropdown.Menu>
        {
          isOp && <>
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
                {
                  currentSocket && currentSocket.operators.map((op) => op.userData.username !== name && <Dropdown.Item key={op.userData.username} onClick={handleClickTaskAssign(op.userData.username, false)}>
                    {op.userData.username}
                  </Dropdown.Item>)
                }
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item onClick={handleClickDelete}>Supprimer</Dropdown.Item>
          </>
        }
        <Dropdown.Item onClick={handleClickTaskAssign(null, true)}>
          S'assigner cette tâche
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
