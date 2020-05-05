import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import "./style.scss";

// Components
import Header from "../Header";
import List from "./List";
import BodyHeader from './BodyHeader';

// Invited components
import InvitedList from './Invited/Lists';

// Actions
import { newSocketTab, connectToTab } from "../../store/Socket/actions";
import { newCurrentTab } from "../../store/Tabs/actions";
import { myLists } from "../../store/Lists/actions";

export default ({ isInvited }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { currentTab } = useSelector((globalState) => globalState.mytabs);
  const { userID } = useSelector((globalState) => globalState.userData.datas);
  const { lists } = useSelector((GlobalState) => GlobalState.mylists);
  const { currentSocket } = useSelector((GlobalState) => GlobalState.sockets);

  /**
   * @param link - pour invités seulement
   * @param friendTabId - pour invités seulement
   * */
  const {
    id, name, link, friendTabId
  } = useParams();

  useEffect(() => {
    if (!isInvited) {
      dispatch(newCurrentTab(id));
    }
    if (isInvited) {
      dispatch(connectToTab({ link, friendTabId }));
    }
  }, []);

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

  useEffect(() => {
    if (currentSocket && currentTab && !isInvited && !lists.length) {
      dispatch(myLists(currentTab._id));
    }
  }, [currentSocket]);

  return (
    <div data-tabid={id} className="workspace" style={{ backgroundImage: `url(../../../${currentTab && currentTab.imgPath})` }}>
      <Header />
      <div className="workspace-body">
        <BodyHeader isInvited={isInvited} />
        {
          !isInvited && <List currentTab={currentTab} lists={lists} isInvited={isInvited} />
        }
        {
          isInvited && <InvitedList />
        }
      </div>
    </div>
  );
};
