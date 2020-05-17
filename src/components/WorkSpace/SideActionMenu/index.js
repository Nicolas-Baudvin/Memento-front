import React, { useState } from "react";
import { Divider, Popup, Button } from 'semantic-ui-react';
import { useSelector } from "react-redux";

// Components
import Actions from "./Actions";

export default ({ isInvited }) => {
  const initialState = {
    view: 'last-actions'
  };
  const { currentSocket } = useSelector((GlobalState) => GlobalState.sockets);
  const [state, setstate] = useState(initialState);

  return (
    <div className="sideActionMenu-container">
      <nav className="sideActionMenu-nav">
        <Button className="sideActionMenu-nav-btn" size="huge" icon="wechat" />
        <Button className="sideActionMenu-nav-btn" size="huge" icon="arrow alternate circle right" />
      </nav>
      <div className="sideActionMenu">

        <h2 className="sideActionMenu-title">Menu</h2>
        <Divider />
        <Actions currentSocket={currentSocket} isInvited={isInvited} state={state} setstate={setstate} />
        <Divider />
        <h2 className="sideActionMenu-subTitle">Membres Connectés</h2>
        <Divider />
        <h3 className="sideActionMenu-owner-title">
          Propriétaire du tableau :
          <Popup
            trigger={
              <div className="sideActionMenu-owner">
                {currentSocket.owner.username.substring(0, 1)}
              </div>
            }
            content={currentSocket.owner.username}
          />
        </h3>
        <div className="sideActionMenu-guests">
          {
            currentSocket && currentSocket.guests.map((guest) => (
              <div className="sideActionMenu-guests__item">
                <Popup
                  trigger={<div className="sideActionMenu guests__item--title">{guest.userData.username.substring(0, 1)}</div>}
                  content={guest.userData.username}
                />
              </div>
            ))
          }
        </div>
        <Divider />
        {
          state.view === "last-actions" && <> <h3 className="sideActionMenu-subTitle"> Dernières actions </h3>
            <Divider />
          </>
        }
        {
          state.view === "chat" && <>
          </>
        }

      </div>
    </div>
  );
};
