import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Actions
import { failMessage } from '../../../store/Popup/actions';
import { newTab, newCurrentTab } from "../../../store/Tabs/actions";

// Components
import Tabs from '../tabs';
import Modal from "../modal";
import FavTabs from './FavTabs';

export default ({
  setstate,
  state,
  tabs
}) => {
  const refBtn = React.createRef();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClose = () => setstate({ ...state, isOpen: false });

  const handleOpen = () => setstate({ ...state, isOpen: true });

  const handleChangeTabName = (e) => setstate({ ...state, tabName: e.target.value });

  const handleClickImg = (num, path) => setstate({
    ...state,
    imgSelected: num,
    imgPath: path
  });

  const openThisTab = (tabId, name) => () => {
    dispatch(newCurrentTab(tabId));
    if (tabId) history.push(`/vos-tableaux/${name}/${tabId}/`);
  };

  const handleSubmitNewTab = () => {
    const { imgPath, tabName, imgSelected } = state;

    if (!imgSelected || !imgPath) {
      return dispatch(failMessage("Vous devez selectionner une image de fond pour continuer"));
    }
    if (!tabName) {
      return dispatch(failMessage("Vous devez choisir un nom pour votre tableau"));
    }
    handleClose();
    return dispatch(newTab({ imgPath, tabName }));
  };

  return (
    <div className="workmenu-body-tabs">
      <h2 className="workmenu-body-tabs-title">
        Mes Tableaux
        <Modal
          handleClose={handleClose}
          handleOpen={handleOpen}
          state={state}
          refBtn={refBtn}
          handleChangeTabName={handleChangeTabName}
          handleClickImg={handleClickImg}
          handleSubmitNewTab={handleSubmitNewTab}
        />
      </h2>
      {
        tabs.length === 0 && <p>Vous n'avez pas encore créé de Tableau !</p>
      }
      <Tabs openThisTab={openThisTab} />
      <FavTabs openThisTab={openThisTab} />
    </div>
  );
};
