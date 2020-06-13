import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';


import "./style.scss";

// Components
import Header from "../Header";
import SideActionMenu from './SideActionMenu';
import WorkspaceBody from './WorkspaceBody';
import LoadPage from "../LoadPage";

// Hooks
import useSearch from '../../hooks/useSearch';

// Actions
import { newSocketTab, connectToTab } from "../../store/Socket/actions";
import { myLists } from "../../store/Lists/actions";

// Context
import SearchContext from "./List/searchContext";
import { newPublicCurrentTab } from "../../store/Tabs/actions";

const WorkSpace = ({ isInvited, isPublic }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentTab } = useSelector((globalState) => globalState.mytabs);
  const { userID } = useSelector((globalState) => globalState.userData.datas);
  const { lists } = useSelector((GlobalState) => GlobalState.mylists);
  const { currentSocket } = useSelector((GlobalState) => GlobalState.sockets);
  const [active, setActive] = useState(true);

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
    if (
      isPublic
      && Object.keys(currentTab).length > 0
    ) {
      return setActive(false);
    }
    if (
      Object.keys(currentSocket).length > 0
      && Object.keys(currentTab).length > 0
      && lists
    ) setActive(false);
  }, [currentTab, currentSocket, lists]);

  useEffect(() => {
    if (isInvited) {
      dispatch(connectToTab({ link, friendTabId }));
    }
    if (isPublic) {
      dispatch(newPublicCurrentTab({ id, history }));
    }
  }, []);

  useEffect(() => {
    if (currentSocket && currentTab && !isInvited && !lists.length && !isPublic) {
      dispatch(myLists(currentTab._id));
    }
  }, [currentSocket]);

  useEffect(() => {
    if (Object.keys(currentTab).length && !isPublic) {
      if (currentTab.userID === userID && !isInvited) {
        dispatch(newSocketTab({ id, name }));
      }
      if (!isInvited && currentTab.userID !== userID) {
        history.push("/");
      }
    }
  }, [currentTab]);

  return (
    active ? <LoadPage title="Chargement de votre espace de travail en cours..." active={active} /> : <SearchContext.Provider value={search}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Memento - Votre Espace de travail</title>
      </Helmet>
      <div data-tabid={id} className="workspace" style={{ backgroundImage: `url(${currentTab && currentTab.imgPath})` }}>
        <Header isPublic={isPublic} />
        <div className="container">
          <WorkspaceBody isPublic={isPublic} currentSocket={currentSocket} currentTab={currentTab} isInvited={isInvited} userID={userID} />
          {
            currentSocket && !isPublic && <SideActionMenu guests={currentSocket.guests} isInvited={isInvited} />
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
