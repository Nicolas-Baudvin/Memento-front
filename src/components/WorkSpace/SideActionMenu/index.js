import React, { useState, useEffect } from "react";
import { Divider } from 'semantic-ui-react';
import { useSelector, useDispatch } from "react-redux";
import cx from 'classnames';
import PropTypes from 'prop-types';

// Components
import Nav from "./Actions";
import LastActions from './LastActions';
import Chat from './Chat';
import About from './About';
import Header from './Header';

// Actions
import { tabAction } from "../../../store/ActionsOnWorkSpace/actions";

// Context

const SideActionMenu = ({ isInvited }) => {
  const { actions } = useSelector((GlobalState) => GlobalState.lastActions);
  const initialState = {
    view: 'last-actions',
    isOpen: false,
    menuIsOpen: false
  };
  const { currentSocket } = useSelector((GlobalState) => GlobalState.sockets);
  const { currentTab } = useSelector((GlobalState) => GlobalState.mytabs);
  const [state, setstate] = useState(initialState);

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
        />
        <Divider />
        {
          state.view === "last-actions" && <LastActions actions={actions} currentTab={currentTab} />
        }
        {
          state.view === "chat" && <Chat />
        }
        {
          state.view === "tabInfo" && <About currentTab={currentTab} isInvited={isInvited} />
        }
      </div>
    </div>
  );
};

SideActionMenu.propTypes = {
  isInvited: PropTypes.bool.isRequired
};

export default SideActionMenu;
