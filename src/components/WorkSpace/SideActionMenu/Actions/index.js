import React from "react";
import { Popup, Button } from "semantic-ui-react";

export default ({ state, setstate }) => {

  const handleClickChangeView = (view) => (e) => {
    setstate({ ...state, view });
  };

  return (
    <ul className="sideActionMenu-actions">

      <li className="sideActionMenu-actions__item">
        {
          state.view === "last-actions" && <Popup
            trigger={<Button onClick={handleClickChangeView('chat')} icon="wechat" color="vk" />}
            content="Accéder au chat"
          />
        }
        {
          state.view === "chat" && <Popup
            trigger={<Button onClick={handleClickChangeView('last-actions')} icon="arrow alternate circle left" color="vk" />}
            content="Retour"
          />
        }

      </li>

      <li className="sideActionMenu-actions__item">
        <Popup
          trigger={<Button icon="table" color="linkedin" />}
          content="Changer la description du tableau"
        />
      </li>

      <li className="sideActionMenu-actions__item">
        <Popup
          trigger={<Button icon="search" color="linkedin" />}
          content="Chercher une tâche"
        />
      </li>

      <li className="sideActionMenu-actions__item">
        <Popup
          trigger={<Button icon="trash alternate" color="red" />}
          content="Supprimer le tableau"
        />
      </li>

    </ul>
  );
};
