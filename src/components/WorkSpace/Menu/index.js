import React from "react";
import { Menu, Dropdown, Icon } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { leaveRoom } from '../../../store/Socket/actions';

import './style.scss';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClickOnDisconnect = () => {
    history.push("/");
    dispatch(leaveRoom());
  };
  return (
    <div className="workspace-menu">
      <Menu attached="top">
        <Dropdown item icon="bars" simple>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Icon name="dropdown" />
              <span className="text">Options</span>

              <Dropdown.Menu>
                <Dropdown.Item>Changer le nom du tableau</Dropdown.Item>
                <Dropdown.Item>Changer l'image du tableau</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item>Changer de tableau</Dropdown.Item>
            <Dropdown.Item>Expulser un invité</Dropdown.Item>
            <Dropdown.Item>Editer les droits invités</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Autre</Dropdown.Header>
            <Dropdown.Item onClick={handleClickOnDisconnect}>Déconnexion de l'instance</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    </div>
  );
};
