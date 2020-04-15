import React from "react";
import {
  Modal, Button, Icon, Header, Input
} from 'semantic-ui-react';
import cx from 'classnames';
import "./style.scss";

export default ({
  handleOpen, handleClose, state, handleChangeTabName, handleClickImg, handleSubmitNewTab
}) => {
  const imgPath = [
    "/assets/tab-bg1.jpg",
    "/assets/tab-bg2.jpg",
    "/assets/tab-bg3.jpg",
    "/assets/tab-bg4.jpg",
    "/assets/tab-bg5.jpg",
    "/assets/tab-bg6.jpg",
    "/assets/tab-bg7.jpg",
  ];
  return (
    <Modal
      trigger={<Button onClick={handleOpen} icon="add" content="Créer un tableau" />}
      open={state.isOpen}
      onClose={handleClose}
      basic
      size="small"
      closeIcon
    >
      <Header icon="browser" content="Création d'un tableau" />
      <Modal.Content>
        <h3>Choississez un nom</h3>
        <Input value={state.tabName} onChange={handleChangeTabName} placeholder="Mon super tableau ..." />
        <h3>Choississez une image de fond</h3>
        <ul className="modal-list">
          {
            imgPath.map((path, i) => (
              <li
                onClick={() => handleClickImg(i + 1, path)}
                className={cx("modal-list__item", { "img-selected": state.imgSelected === i + 1 })}
                key={path}
              >
                <img className="modal-img" src={path} alt={`background ${i}`} />
              </li>
            ))
          }

        </ul>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={handleSubmitNewTab} inverted>
          <Icon name="checkmark" /> Créer
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
