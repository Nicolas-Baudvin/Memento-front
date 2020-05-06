import React, { useState } from "react";
import { Input, Popup } from 'semantic-ui-react';
import { useDispatch } from "react-redux";

// Component
import { Button } from '../../../Utils/Components';
import { deleteList } from "../../../store/Lists/actions";

export default ({ showTitleInput, handleUpdateListName, list }) => {
  const initialState = {};

  const [state, setstate] = useState(initialState);
  const dispatch = useDispatch();
  const showSettings = () => {
    if (list._id) {
      dispatch(deleteList(list._id));
    }
  };

  const handleChange = (listId) => (e) => {
    setstate({ ...state, [listId]: e.target.value });
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
        onChange={handleChange(list._id)}
        action={{ content: state[list._id] ? 'Envoyer' : 'Retour', color: state[list._id] ? 'blue' : 'red', onClick: handleUpdateListName(list) }}
      />
    </div>
  );
};
