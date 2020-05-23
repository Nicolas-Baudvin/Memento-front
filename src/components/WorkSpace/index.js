import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';


import "./style.scss";

// Components
import Header from "../Header";
import List from "./List";
import BodyHeader from './BodyHeader';
import SideActionMenu from './SideActionMenu';

// Hooks
import useSearch from '../../hooks/useSearch';

// Invited components
import InvitedList from './Invited/Lists';

// Actions
import { newSocketTab, connectToTab } from "../../store/Socket/actions";
import { newCurrentTab } from "../../store/Tabs/actions";
import { myLists } from "../../store/Lists/actions";

// Context
import SearchContext from "./List/searchContext";

export default ({ isInvited }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentTab } = useSelector((globalState) => globalState.mytabs);
  const { userID } = useSelector((globalState) => globalState.userData.datas);
  const { lists } = useSelector((GlobalState) => GlobalState.mylists);
  const { tasks } = useSelector((GlobalState) => GlobalState.mytasks);
  const { currentSocket } = useSelector((GlobalState) => GlobalState.sockets);
  const [sortedTasks, setSortedTasks] = useState(tasks);
  const search = useSearch();

  /**
   * @param link - pour invités seulement
   * @param friendTabId - pour invités seulement
   * */
  const {
    id, name, link, friendTabId
  } = useParams();
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const sourceList = lists.filter((x) => x._id === source.droppableId)[0];
    const destList = lists.filter((x) => x._id === destination.droppableId)[0];
    if (sourceList._id === destList._id) {
      const sourceTask = sortedTasks.filter((x) => x._id === draggableId)[0];
      const destTask = sortedTasks[destination.index];
      const sourceOrder = sourceTask.order;
      const destOrder = destTask.order;

      sourceTask.order = destOrder;
      destTask.order = sourceOrder;
      const newArray = sortedTasks.map((task) => {
        if (sourceTask._id === task._id) {
          task = sourceTask;
        }
        if (task.order >= sourceTask.order) {
          task.order += 1;
        }
        return task;
      });
      setSortedTasks(newArray.sort((a, b) => a.order - b.order));
      console.log(newArray);
    }
    if (sourceList._id !== destList._id) {
      const sourceTask = sortedTasks.filter((x) => x._id === draggableId)[0];
      const destTask = sortedTasks[destination.index];
      const destOrder = destTask.order;

      sourceTask.order = destOrder;
      sourceTask.listId = destination.droppableId;

      const newArray = sortedTasks.map((task) => {
        if (sourceTask._id === task._id) {
          task = sourceTask;
        }
        if (task.order >= sourceTask.order && task.listId === source.droppableId && sourceTask._id !== task._id) task.order -= 1;
        if (task.order >= sourceTask.order && task.listId !== source.droppableId && sourceTask._id !== task._id) task.order += 1;
        return task;
      });
      setSortedTasks(newArray.sort((a, b) => a.order - b.order));
      console.log(newArray.sort((a, b) => a.order - b.order));
    }
  };

  useEffect(() => {
    setSortedTasks(tasks);
  }, [tasks]);

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
    <SearchContext.Provider value={search}>
      <div data-tabid={id} className="workspace" style={{ backgroundImage: `url(../../../${currentTab && currentTab.imgPath})` }}>
        <Header />
        <div className="container">
          <div className="workspace-body">
            <BodyHeader isInvited={isInvited} />
            {
              !isInvited && <DragDropContext onDragEnd={onDragEnd}>
                <div className="workspace-body-lists">
                  <List tasks={sortedTasks} currentTab={currentTab} lists={lists} isInvited={isInvited} />
                </div>
              </DragDropContext>
            }
            {
              isInvited && <InvitedList />
            }
          </div>
          {
            currentSocket && <SideActionMenu guests={currentSocket.guests} isInvited={isInvited} />
          }
        </div>
      </div>
    </SearchContext.Provider>
  );
};
