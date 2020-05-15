import React from "react";
import { Popup, Button } from "semantic-ui-react";

export default () => {
  return (
    <ul className="sideActionMenu-actions">

      <li className="sideActionMenu-actions__item">
        <Popup
          trigger={<Button icon="wechat" color="vk" />}
          content="Accéder au chat"
        />

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
