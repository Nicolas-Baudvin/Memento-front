import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import { Input, Button, Popup } from 'semantic-ui-react';
import cx from 'classnames';
import "./style.scss";

// Components
import Header from "../Header";
import List from "./List";
import Guests from "./Guest";
import Menu from './Menu';
import Owner from './Owner';

// Actions
import { newSocketTab, connectToTab } from "../../store/Socket/actions";
import { newCurrentTab } from "../../store/Tabs/actions";
import { failMessage } from "../../store/Popup/actions";

export default ({ isInvited }) => {
  const initialState = {
    openAddList: false,
    addlist: ''
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setstate] = useState(initialState);
  const { currentSocket, guests } = useSelector((globalState) => globalState.sockets);
  const { currentTab } = useSelector((globalState) => globalState.mytabs);
  const { userID } = useSelector((globalState) => globalState.userData.datas);
  /**
   * @param link - pour invités seulement
   * @param friendTabId - pour invités seulement
   * */
  const {
    id, name, link, friendTabId
  } = useParams();

  const CopyToClipBoard = () => {
    const copy = document.querySelector('.workspace-body-invitation').firstChild;
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
      if (result.state === "granted" || result.state === "prompt") {
        copy.select();
        copy.setSelectionRange(0, 99999);

        document.execCommand('Copy');
      }
    });
  };

  const handleAddListbtn = () => {
    console.log(!state.addlist);
    if (!state.addlist) {
      setstate({ ...state, openAddList: !state.openAddList });
    }
    else {
      console.log("nouvelle liste ...");
    }
  };

  useEffect(() => {
    if (!isInvited) {
      console.log("Création d'une nouvelle instance...");
      dispatch(newSocketTab({ id, name }));
    }
    if (!isInvited) {
      console.log("Recherche de la table en cours...");
      dispatch(newCurrentTab(id));
    }
    if (isInvited) {
      dispatch(connectToTab({ link, friendTabId }));
    }
    if (currentTab.userID !== userID && !isInvited) {
      console.log(currentTab.userID, userID);
      history.push("/");
      return dispatch(failMessage("Vous ne pouvez pas accéder à un tableau qui ne vous appartient pas"));
    }
  }, []);

  return (
    <div data-tabid={id} className="workspace" style={{ backgroundImage: `url(../../../${currentTab && currentTab.imgPath})` }}>
      <Header />
      <div className="workspace-body">
        <div className="workspace-body-header">
          <Menu className="workspace-body-header-menuBtn" isInvited={isInvited} />
          {
            userID === currentTab.userID && currentSocket && <Popup
              content="C'est le liens qui te permettra d'inviter tes amis !"
              trigger={<Input
                className="workspace-body-invitation"
                action={{
                  color: 'blue',
                  labelPosition: 'right',
                  icon: 'copy',
                  content: 'Copier',
                  onClick: CopyToClipBoard
                }}
                defaultValue={`http://localhost:3000/join/${currentTab._id}/${currentSocket.invitationLink}/`}
              />}
            />
          }
          <Popup
            content="C'est ici que tu vas créer ta liste. Appuie sur le bouton de gauche pour valider ton choix !"
            trigger={
              <Input
                value={state.addlist}
                onChange={(e) => setstate({ ...state, addlist: e.target.value })}
                action={{
                  color: 'blue', icon: 'add', content: 'Ajouter une liste', onClick: handleAddListbtn
                }}
                actionPosition="left"
                className={cx("workspace-body-header-input", { "addlist-active": state.openAddList })}
                placeholder="Nom de votre liste"
              />
            }
          />
          <div className="workspace-body-header-members">
            {
              currentSocket && <Owner currentSocket={currentSocket} isInvited={isInvited} />
            }
            <Guests guests={currentSocket.guests} isInvited={isInvited} />
          </div>

        </div>
        <List />
        {
          isInvited && <div className="workspace-body-invited" />
        }
        {
          !isInvited && <div className="workspace-body-" />
        }
      </div>
    </div>
  );
};
