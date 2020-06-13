import React, { useState } from 'react';
import { Popup, Input } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { newList } from "../../../../store/Lists/actions";
import { failMessage } from "../../../../store/Popup/actions";

const AddListInput = ({ currentTab }) => {
  const dispatch = useDispatch();

  const initialState = {
    addlist: ''
  };

  const [state, setstate] = useState(initialState);

  const handleAddListbtn = () => {
    if (state.addlist && state.addlist.length < 30) dispatch(newList({ name: state.addlist, tabId: currentTab._id }));
    else dispatch(failMessage("Le titre d'une liste doit contenir entre 1 et 30 caractères"));
  };

  return (
    <Popup
      content="C'est ici que tu vas créer ta liste. Appuie sur le bouton de gauche pour valider ton choix !"
      className="workspace-body-header-popup"
      trigger={
        <Input
          value={state.addlist}
          onChange={(e) => setstate({ ...state, addlist: e.target.value })}
          action={{
            color: 'blue', content: 'Ajouter liste', onClick: handleAddListbtn, className: "workspace-body-header-input-submit"
          }}
          className="workspace-body-header-input"
          placeholder="Nom de votre liste"
        />
      }
    />
  )
};

AddListInput.propTypes = {
  currentTab: PropTypes.object.isRequired
};

export default AddListInput;
