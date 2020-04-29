import React, { useState, useEffect } from "react";
import { Button } from 'semantic-ui-react';
import "./style.scss";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { failMessage } from '../../store/Popup/actions';
import { newTab, myTabs } from "../../store/Tabs/actions";


// Components
import Modal from './modal';
import Header from '../Header';
import Tabs from './tabs';
import Teams from './teams';
import { cleanLists } from "../../store/Lists/actions";
import { disconnectFromChannel } from "../../store/Socket/actions";

export default () => {
  const { tabs } = useSelector((GlobalState) => GlobalState.mytabs);
  const dispatch = useDispatch();
  const initialState = {
    view: 'Tabs',
    isOpen: false,
    tabName: '',
    imgSelected: false,
    imgPath: false
  };
  const refBtn = React.createRef();
  const [state, setstate] = useState(initialState);
  const history = useHistory();

  const handleClose = () => {
    setstate({ ...state, isOpen: false });
  };

  const handleOpen = () => {
    setstate({ ...state, isOpen: true });
  };

  const handleChangeTabName = (e) => {
    setstate({ ...state, tabName: e.target.value });
  };

  const handleClickImg = (num, path) => {
    setstate({
      ...state,
      imgSelected: num,
      imgPath: path
    });
  };

  const openThisTab = (tabId, name) => {
    if (tabId) history.push(`/vos-tableaux/${name}/${tabId}`);
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

  useEffect(() => {
    dispatch(disconnectFromChannel());
    dispatch(cleanLists());
    dispatch(myTabs());
  }, []);

  return (
    <div className="workmenu">

      <Header handleOpen={handleOpen} />

      <main className="workmenu-body">

        <div className="workmenu-body-menu">
          <Button
            onClick={() => setstate({ ...state, view: "Tabs" })}
            basic
            icon="table"
            content="Vos tableaux"
          />
          <Button
            onClick={() => setstate({ ...state, view: "Teams" })}
            basic
            icon="users"
            content="équipes"
          />
        </div>
        {
          state.view === "Tabs" && <div className="workmenu-body-tabs">
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

          </div>
        }
        {
          state.view === "Teams" && <Teams teams={false} />
        }

      </main>
    </div>
  );
};
