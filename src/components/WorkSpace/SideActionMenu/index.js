import React, { useState, useContext, useEffect } from "react";
import { Divider, Popup } from 'semantic-ui-react';
import { useSelector, useDispatch } from "react-redux";
import cx from 'classnames';

// Components
import Nav from "./Actions";
import LastActions from './LastActions';
import Chat from './Chat';
import About from './About';
import Header from './Header';

// Actions
import { tabAction } from "../../../store/ActionsOnWorkSpace/actions";

// Context
import searchContext from '../List/searchContext';

export default ({ isInvited }) => {
  const { actions } = useSelector((GlobalState) => GlobalState.lastActions);
  const initialState = {
    view: 'last-actions',
    isOpen: false,
    menuIsOpen: false
  };
  const { currentSocket } = useSelector((GlobalState) => GlobalState.sockets);
  const { currentTab } = useSelector((GlobalState) => GlobalState.mytabs);
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
    <div className={cx("sideActionMenu-container", { menuOpen: state.menuIsOpen })}>
      <Nav state={state} setstate={setstate} isInvited={isInvited} />
      <div className="sideActionMenu">

        <Header
          currentSocket={currentSocket}
          state={state}
          handleSearchChange={handleSearchChange}
        />
        <Divider />
        {
          state.view === "last-actions" && <>
            <h3 className="sideActionMenu-subTitle"> Dernières actions </h3>
            <Divider />
            <LastActions actions={actions} currentTab={currentTab} />
          </>
        }
        {
          state.view === "chat" && <>
            <h3 className="sideActionMenu-subTitle">Discussion</h3>
            <Divider />
            <Chat />
          </>
        }
        {
          state.view === "tabInfo" && <>
            <h3 className="sideActionMenu-subTitle">À propos</h3>
            <Divider />
            <About />
          </>
        }

      </div>
    </div>
  );
};
