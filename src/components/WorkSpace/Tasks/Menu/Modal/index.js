import React, { useState } from 'react';
import { Modal, TextArea, Button, Dropdown } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';

import './style.scss';
import { updateTaskName } from '../../../../../store/Tasks/actions';

export default ({ task, state, setstate }) => {
  const [value, setValue] = useState(`${task.title} `);
  const dispatch = useDispatch();

  const handleClose = () => setstate({ ...state, open: false });

  const handleUpdateTaskTitle = (e) => {
    e.preventDefault();
    if (value) dispatch(updateTaskName({ title: value, taskId: task._id, oldTitle: task.name }));
    setstate({ ...state, open: false });
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  return (
    <Modal
      trigger={<Dropdown.Item onClick={() => setstate({ ...state, open: true })}>
        Modifier le nom
      </Dropdown.Item>}
      open={state.open}
      onClose={handleClose}
      basic
      size="small"
      closeIcon
    >
      <Modal.Header>
        <h2 className="taskupdate-title">Modification de la tâche</h2>
      </Modal.Header>
      <Modal.Content>
        <form className="taskupdate" action="">
          <TextArea value={value} onChange={handleChange} />
          <Button onClick={handleUpdateTaskTitle} color="green" icon="send" content="Envoyer" />
        </form>
      </Modal.Content>
    </Modal>
  );
};
