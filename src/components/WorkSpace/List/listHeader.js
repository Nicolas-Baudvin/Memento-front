import React, { useState } from "react";
import { Input, Popup } from 'semantic-ui-react';
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';

// Actions
import { deleteList, updateList } from "../../../store/Lists/actions";

// Component
import { Button } from '../../../Utils/Components';



const ListHeader = ({ list }) => {
  const initialState = {};

  const [state, setstate] = useState(initialState);
  const dispatch = useDispatch();
  const deleteItem = () => {
    if (list._id) {
      dispatch(deleteList({ listID: list._id, name: list.name }));
    }
  };


  const showTitleInput = (e) => {
    const title = e.target;
    title.classList.remove("show");
    title.parentNode.lastChild.classList.add("show");
    title.nextSibling.classList.remove("show");
  };

  const handleUpdateListName = () => (e) => {
    e.preventDefault();
    const value = e.target.previousSibling.value;
    const input = e.target.parentNode;
    const settings = e.target.parentNode.previousSibling;
    const title = input.parentNode.firstChild;

    input.classList.remove("show");
    settings.classList.add("show");
    title.classList.add("show");
    if (value) dispatch(updateList({ newTitle: value, list }));
  };

  const handleChange = (listId) => (e) => {
    setstate({ ...state, [listId]: e.target.value });
  };

  return (
    <div className="list-header">
      <Popup
        trigger={<h2 onClick={showTitleInput} className="list-header-title show"> {list.name} </h2>}
        content="Cliquez pour modifier le nom"
      />
      <Popup
        trigger={
          <Button className="list-header-settingsBtn show" onClick={() => deleteItem(list)} icon="delete" color="#ff0000" />
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

ListHeader.propTypes = {
  list: PropTypes.object.isRequired
};

export default ListHeader;
