import React, { useState, useContext, useEffect } from "react";
import { Divider, Popup, Input } from 'semantic-ui-react';
import { useSelector, useDispatch } from "react-redux";

// Components
import Nav from "./Actions";

// Actions
import { tabAction } from "../../../store/ActionsOnWorkSpace/actions";

// Context
import searchContext from '../List/searchContext';

export default ({ isInvited }) => {
  const { actions } = useSelector((GlobalState) => GlobalState.lastActions);
  const initialState = {
    view: 'last-actions',
    isOpen: false
  };
  const { currentSocket } = useSelector((GlobalState) => GlobalState.sockets);
  const [state, setstate] = useState(initialState);
  const search = useContext(searchContext);

  const handleSearchChange = (e) => {
    search.setCurrentSearch(e.target.value);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tabAction());
  }, []);

  return (
    <div className="sideActionMenu-container">
      <Nav state={state} setstate={setstate} isInvited={isInvited} />
      <div className="sideActionMenu">

        <h2 className="sideActionMenu-title">Menu</h2>
        <Divider />
        <Input
          loading={state.isLoading}
          onChange={handleSearchChange}
          icon="search"
          placeholder="Chercher une carte"
        />
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
                  trigger={<div className="sideActionMenu-guests__item--title">{guest.userData.username.substring(0, 1)}</div>}
                  content={guest.userData.username}
                />
              </div>
            ))
          }
        </div>
        <Divider />
        {
          state.view === "last-actions" && <>
            <h3 className="sideActionMenu-subTitle"> Dernières actions </h3>
            <Divider />
            <div className="sideActionMenu-actions">
              {
                actions && actions.map((act) => {
                  return (<div className="sideActionMenu-actions__item">
                    <time>{act.createdAt.replace('T', ' ').replace('Z', '').substring(0, 19)}</time>
                    <p>
                      <span>{`${act.author} `}</span>
                      {act.action}
                    </p>
                  </div>);
                })
              }
            </div>
          </>
        }
        {
          state.view === "chat" && <>
            <h3 className="sideActionMenu-subTitle">Discussion</h3>
            <Divider />
            <div className="sideActionMenu-chat">
              {/* chat */}
            </div>
          </>
        }
        {
          state.view === "tabInfo" && <>
            <h3 className="sideActionMenu-subTitle">À propos</h3>
            <Divider />
            <div className="sideActionMenu-tabInfo">

            </div>
          </>
        }

      </div>
    </div>
  );
};
