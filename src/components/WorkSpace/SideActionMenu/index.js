import React, { useState, useEffect } from "react";
import { Divider, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";
import cx from 'classnames';
import PropTypes from 'prop-types';

// Components
import Nav from "./Actions";
import LastActions from './LastActions';
import Chat from './Chat';
import About from './About';
import Header from './Header';
import Rights from './Rights';
import Invitation from './Invitation';

// Actions
import { tabAction } from "../../../store/ActionsOnWorkSpace/actions";

const useStyles = makeStyles(() => ({
  divider: {
    margin: '1em 0'
  }
}));


const SideActionMenu = ({ isInvited }) => {
  const classes = useStyles();
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
        <Divider className={classes.divider} variant="middle" />
        {
          state.view === "last-actions" && <LastActions actions={actions} currentTab={currentTab} />
        }
        {
          state.view === "chat" && <Chat />
        }
        {
          state.view === "tabInfo" && <About currentTab={currentTab} isInvited={isInvited} />
        }
        {
          state.view === "rights" && !isInvited && <Rights currentSocket={currentSocket} />
        }
        {
          state.view === "invitation" && !isInvited && <Invitation />
        }
      </div>
    </div>
  );
};

SideActionMenu.propTypes = {
  isInvited: PropTypes.bool.isRequired
};

export default SideActionMenu;
