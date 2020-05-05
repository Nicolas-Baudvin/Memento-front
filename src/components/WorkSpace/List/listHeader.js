import React from "react";
import { Input, Popup } from 'semantic-ui-react';
import { useDispatch } from "react-redux";

// Component
import { Button } from '../../../Utils/Components';
import { deleteList } from "../../../store/Lists/actions";

export default ({ showTitleInput, handleUpdateListName, list }) => {
  const dispatch = useDispatch();
  const showSettings = () => {
    if (list._id) {
      dispatch(deleteList(list._id));
    }
  };

  return (
    <div className="list-header">
      <h2 onClick={showTitleInput} className="list-header-title show"> {list.name} </h2>
      <Popup
        trigger={
          <Button className="list-header-settingsBtn show" onClick={() => showSettings(list)} icon="delete" color="#ff0000" />
        }
        content="Supprimer"
      />
      <Input
        className="list-header-input"
        placeholder="Nom de la liste"
        action={{ content: 'Envoyer', color: 'blue', onClick: handleUpdateListName(list) }}
      />
    </div>
  );
};
