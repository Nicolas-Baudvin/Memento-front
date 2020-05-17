import React from "react";
import { Popup, Button, Input } from "semantic-ui-react";
import { useContext } from "react";

export default ({ state, setstate, isInvited }) => {
  const { isLoading, view } = state;

  const handleClickChangeView = (viewName) => (e) => {
    setstate({ ...state, view: viewName });
  };

  return (
    <>
      <nav className="sideActionMenu-nav">
        <Popup
          trigger={<Button onClick={handleClickChangeView('chat')} size="huge" icon="wechat" color="vk" />}
          content="Accéder au chat"
        />
        <Popup
          trigger={<Button onClick={handleClickChangeView('tabInfo')} size="huge" icon="table" color="linkedin" />}
          content="À propos de ce tableau"
        />
        {
          !isInvited && <Popup
            trigger={<Button icon="trash alternate" size="huge" color="red" />}
            content="Supprimer le tableau"
          />
        }
        <Popup
          trigger={<Button className="sideActionMenu-nav-btn" size="huge" icon="arrow alternate circle right" />}
          content="Retour aux actions"
        />

      </nav>
    </>
  );
};
