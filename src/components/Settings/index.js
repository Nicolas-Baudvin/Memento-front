import React from "react";
import {
  Modal, Header, Icon, Button
} from 'semantic-ui-react';
import "./style.scss";

export default ({ handleOpen, state, handleClose }) => (
  <Modal
    trigger={<li onClick={handleOpen}>Paramètres</li>}
    open={state.open}
    onClose={handleClose}
    basic
    size="small"
    closeIcon
  >
    <Header icon="browser" content="Paramètres utilisateurs" />
    <Modal.Content>
      <h3 className="settings-title">Modifier un tableau</h3>

      <h3 className="settings-title">Vos données</h3>
    </Modal.Content>
    <Modal.Actions>
      <Button color="green" onClick={handleClose} inverted>
        <Icon name="checkmark" /> Got it
      </Button>
    </Modal.Actions>
  </Modal>
);
