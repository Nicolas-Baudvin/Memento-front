import React, { useState } from "react";
import { Popup, Input } from 'semantic-ui-react';
import { useSelector, useDispatch } from "react-redux";

// Components
import Guests from "../Guest";
import Owner from '../Owner';
import Menu from '../Menu';
import { newList } from "../../../store/Lists/actions";

export default ({ isInvited }) => {
  const dispatch = useDispatch();
  const { currentSocket } = useSelector((globalState) => globalState.sockets);
  const { currentTab } = useSelector((globalState) => globalState.mytabs);
  const { userID } = useSelector((globalState) => globalState.userData.datas);
  const initialState = {
    addlist: ''
  };
  const [state, setstate] = useState(initialState);

  const copyToClipBoard = () => {
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
    if (state.addlist && state.addlist.length < 30) dispatch(newList({ name: state.addlist, tabId: currentTab._id }));
  };

  return (
    <div className="workspace-body-header">
      <Menu className="workspace-body-header-menuBtn" isInvited={isInvited} />
      {
        userID === currentTab.userID && currentSocket && <>
          <Popup
            content="C'est le liens qui te permettra d'inviter tes amis !"
            trigger={<Input
              className="workspace-body-invitation"
              action={{
                color: 'blue',
                labelPosition: 'right',
                icon: 'copy',
                content: 'Copier',
                onClick: copyToClipBoard
              }}
              defaultValue={`http://localhost:3000/join/${currentTab._id}/${currentSocket.invitationLink}/`}
            />}
          />
          <Popup
            content="C'est ici que tu vas créer ta liste. Appuie sur le bouton de gauche pour valider ton choix !"
            trigger={
              <Input
                value={state.addlist}
                onChange={(e) => setstate({ ...state, addlist: e.target.value })}
                action={{
                  color: 'blue', icon: 'add', content: 'Ajouter une liste', onClick: handleAddListbtn, className: "list-add"
                }}
                actionPosition="left"
                className="workspace-body-header-input"
                placeholder="Nom de votre liste"
              />
            }
          />
        </>
      }
      <div className="workspace-body-header-members">
        {
          currentSocket && <Owner currentSocket={currentSocket} isInvited={isInvited} />
        }
        <Guests guests={currentSocket.guests} isInvited={isInvited} />
      </div>

    </div>
  );
};
