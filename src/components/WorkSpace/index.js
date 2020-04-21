import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { Input } from 'semantic-ui-react';
import "./style.scss";

// Components
import Header from "../Header";

// Actions
import { newSocketTab, connectToTab } from "../../store/Socket/actions";
import { newCurrentTab } from "../../store/Tabs/actions";

export default ({ isInvited }) => {
  const dispatch = useDispatch();
  const { currentSocket } = useSelector((globalState) => globalState.sockets);
  const { currentTab } = useSelector((globalState) => globalState.mytabs);
  const { userID } = useSelector((globalState) => globalState.userData.datas);

  /**
   * @param link - pour invités seulement
   * @param friendTabId - pour invités seulement
   * */
  const { id, name, link, friendTabId } = useParams();

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
  }, []);

  return (
    <div data-tabid={id} className="workspace" style={{ backgroundImage: `url(../../../${currentTab.imgPath})` }}>
      <Header />
      <div className="workspace-body">
        {
          userID === currentTab.userID && <Input
            className="workspace-body-invitation"
            action={{
              color: 'blue',
              labelPosition: 'right',
              icon: 'copy',
              content: 'Copier',
              onClick: CopyToClipBoard
            }}
            defaultValue={`http://localhost:3000/join/${currentTab._id}/${currentSocket.invitationLink}/`}
          />
        }
        {
          isInvited && <div className="workspace-body-invited">

          </div>
        }
        {
          !isInvited && <div className="workspace-body-">

          </div>
        }
      </div>
    </div>
  );
};
