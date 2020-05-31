import React, { useState } from 'react';
import {
  Modal, TextArea, Button, Dropdown
} from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { updateTaskName } from '../../../../../store/Tasks/actions';

// Styles
import './style.scss';

const ModalComponent = ({ task, state, setstate }) => {
  const [value, setValue] = useState(`${task.title} `);
  const dispatch = useDispatch();

  const handleClose = () => setstate({ ...state, open: false });

  const handleUpdateTaskTitle = (e) => {
    e.preventDefault();
    if (value) dispatch(updateTaskName({ title: value, taskId: task._id, oldTitle: task.title }));
    setstate({ ...state, open: false });
  };
  const handleChange = (e) => setValue(e.target.value);

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

ModalComponent.propTypes = {
  task: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  setstate: PropTypes.func.isRequired
};

export default ModalComponent;
