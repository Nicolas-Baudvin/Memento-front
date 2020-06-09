import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';


import "./style.scss";

// Components
import Header from "../Header";
import BodyHeader from './BodyHeader';
import SideActionMenu from './SideActionMenu';
import WorkspaceBody from './WorkspaceBody';

// Hooks
import useSearch from '../../hooks/useSearch';

// Invited components
import DragDropContext from './DragDropContext';

// Actions
import { newSocketTab, connectToTab } from "../../store/Socket/actions";
import { myLists } from "../../store/Lists/actions";

// Context
import SearchContext from "./List/searchContext";

const WorkSpace = ({ isInvited }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentTab } = useSelector((globalState) => globalState.mytabs);
  const { userID } = useSelector((globalState) => globalState.userData.datas);
  const { lists } = useSelector((GlobalState) => GlobalState.mylists);
  const { currentSocket } = useSelector((GlobalState) => GlobalState.sockets);


  const search = useSearch();
  /**
   * @param link - pour invités seulement
   * @param friendTabId - pour invités seulement
   * */
  const {
    id,
    name,
    link,
    friendTabId
  } = useParams();

  useEffect(() => {
    if (isInvited) {
      dispatch(connectToTab({ link, friendTabId }));
    }
  }, []);

  useEffect(() => {
    if (currentSocket && currentTab && !isInvited && !lists.length) {
      dispatch(myLists(currentTab._id));
    }
  }, [currentSocket]);

  useEffect(() => {
    if (Object.keys(currentTab).length) {
      if (currentTab.userID === userID && !isInvited) {
        dispatch(newSocketTab({ id, name }));
      }
      if (!isInvited && currentTab.userID !== userID) {
        history.push("/");
      }
    }
  }, [currentTab]);

  return (
    <SearchContext.Provider value={search}>
      <div data-tabid={id} className="workspace" style={{ backgroundImage: `url(../../../${currentTab && currentTab.imgPath})` }}>
        <Header />
        <div className="container">
          <WorkspaceBody currentSocket={currentSocket} currentTab={currentTab} isInvited={isInvited} userID={userID} />
          {
            currentSocket && <SideActionMenu guests={currentSocket.guests} isInvited={isInvited} />
          }
        </div>
      </div>
    </SearchContext.Provider>
  );
};

WorkSpace.propTypes = {
  isInvited: PropTypes.bool.isRequired
};

export default WorkSpace;
