/* eslint-disable no-underscore-dangle */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Confirm, Icon } from 'semantic-ui-react';

// Styles
import "./style.scss";

// actions
import { failMessage } from "../../store/Popup/actions";
import { deleteTab } from "../../store/Tabs/actions";

export default ({ openThisTab }) => {
  const { tabs } = useSelector((GlobalState) => GlobalState.mytabs);
  const dispatch = useDispatch();
  const initialState = {
    open: false
  };

  const [state, setstate] = useState(initialState);

  const handleCancel = () => setstate({ ...state, open: false });

  const handleConfirm = () => {
    const tabId = state.tabId;
    setstate({ ...state, open: false });

    if (!tabId) {
      return dispatch(failMessage("Erreur : Cette table n'existe pas."));
    }
    return dispatch(deleteTab(tabId));
  };

  return (
    <div className="workmenu-tabs">
      {
        tabs.map((tab) => (
          <div key={tab._id} className="workmenu-tabs-item">
            <h2 onClick={() => openThisTab(tab._id)} className="workmenu-tabs-item-title"> {tab.name} </h2>
            <div onClick={() => setstate({ ...state, open: true, tabId: tab._id })} className="workmenu-tabs-item-delete"><Icon name="delete" color="red" /></div>
            <Confirm
              header="Vous êtes sur le point de supprimer un tableau"
              open={state.open}
              onCancel={handleCancel}
              onConfirm={() => handleConfirm()}
              size="small"
              content="Toutes les listes et tâches liées à ce tableau seront définitivement perdus. Êtes vous sûr de vouloir continuer ?"
            />
            <img onClick={() => openThisTab(tab._id, tab.name)} className="workmenu-tabs-item-img" src={tab.imgPath} alt="Fond de votre tableau" />
          </div>
        ))
      }
    </div>
  );
};
