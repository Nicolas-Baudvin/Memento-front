import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Actions
import { newCurrentTab } from "../../../store/Tabs/actions";

// Components
import Tabs from '../tabs';
import Modal from "../modal";
import FavTabs from './FavTabs';

export default ({
  setstate,
  state,
  tabs
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClickImg = (num, path) => setstate({
    ...state,
    imgSelected: num,
    imgPath: path
  });

  const openThisTab = (tabId, name) => () => {
    dispatch(newCurrentTab(tabId));
    if (tabId) history.push(`/vos-tableaux/${name}/${tabId}/`);
  };

  return (
    <div className="workmenu-body-tabs">
      <div className="workmenu-body-tabs-header">
        <h2 className="workmenu-body-tabs-title">
          Mes Tableaux
        </h2>
        <Modal
          handleClickImg={handleClickImg}
          state={state}
          setstate={setstate}
        />
      </div>
      {
        tabs.length === 0 && <p className="workmenu-body-tabs-alert">Vous n'avez pas encore créé de Tableau !</p>
      }
      <Tabs tabs={tabs} openThisTab={openThisTab} />
      <FavTabs openThisTab={openThisTab} />
    </div>
  );
};
