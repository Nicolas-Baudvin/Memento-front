import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import "./style.scss";

// Components
import Header from "../Header";
import List from "./List";
import BodyHeader from './BodyHeader';

// Actions
import { newSocketTab, connectToTab } from "../../store/Socket/actions";
import { newCurrentTab } from "../../store/Tabs/actions";
import { failMessage } from "../../store/Popup/actions";
import { list } from "postcss";
import { myLists } from "../../store/Lists/actions";

export default ({ isInvited }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { currentTab } = useSelector((globalState) => globalState.mytabs);
  const { userID } = useSelector((globalState) => globalState.userData.datas);
  const { lists } = useSelector((GlobalState) => GlobalState.mylists);
  /**
   * @param link - pour invités seulement
   * @param friendTabId - pour invités seulement
   * */
  const {
    id, name, link, friendTabId
  } = useParams();

  useEffect(() => {
    dispatch(newCurrentTab(id));
    if (Object.keys(currentTab).length) {
      if (currentTab.userID === userID && !isInvited) {
        dispatch(newSocketTab({ id, name }));
      }
      else {
        history.push("/");
      }
      if (isInvited) {
        dispatch(connectToTab({ link, friendTabId }));
      }
    }
  }, []);

  useEffect(() => {
    console.log("rechercher des listes en cours...")
    if (currentTab && !lists.length) {
      console.log(currentTab._id);
      dispatch(myLists(currentTab._id));
    }
  }, [currentTab]);

  return (
    <div data-tabid={id} className="workspace" style={{ backgroundImage: `url(../../../${currentTab && currentTab.imgPath})` }}>
      <Header />
      <div className="workspace-body">
        <BodyHeader isInvited={isInvited} />
        <List lists={lists} />
      </div>
    </div>
  );
};
