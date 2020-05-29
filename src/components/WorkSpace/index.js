import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';


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
import { myLists, reorderLists } from "../../store/Lists/actions";

// Context
import SearchContext from "./List/searchContext";
import { updateOrder } from "../../store/Tasks/actions";

export default ({ isInvited }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentTab } = useSelector((globalState) => globalState.mytabs);
  const { userID } = useSelector((globalState) => globalState.userData.datas);
  const { lists } = useSelector((GlobalState) => GlobalState.mylists);
  const { tasks } = useSelector((GlobalState) => GlobalState.mytasks);
  const { currentSocket } = useSelector((GlobalState) => GlobalState.sockets);
  const [sortedTasks, setSortedTasks] = useState([]);
  const [sortedLists, setSortedLists] = useState([]);
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
  const onDragEnd = (result) => {
    const {
      destination, source, draggableId, type
    } = result;
    const sourceList = lists.filter((x) => x._id === source.droppableId)[0];
    const sourceTask = sortedTasks.filter((x) => x._id === draggableId)[0];
    let newSortedTasks;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    if (type === "column") {
      console.log(destination, source, draggableId);

      const newListArray = sortedLists.map((item) => {
        if (draggableId === item._id) {
          item.order = destination.index;
        }
        else {
          if (source.index < item.order && destination.index >= item.order) {
            item.order -= 1;
          }
          if (source.index > item.order && destination.index <= item.order) {
            item.order += 1;
          }
        }
        return item;
      });

      console.log(newListArray);

      setSortedLists(newListArray);
      dispatch(reorderLists(newListArray));
    }

    if (type === "task") {
      if (sourceList._id === destination.droppableId) {
        newSortedTasks = sortedTasks.map((item) => {
          if (item._id === sourceTask._id) {
            item.order = destination.index;
          }
          else if (item.listId === sourceTask.listId) {
            if (source.index < item.order && destination.index >= item.order) {
              item.order -= 1;
            }
            if (source.index > item.order && destination.index <= item.order) {
              item.order += 1;
            }
          }
          return item;
        });

        setSortedTasks(newSortedTasks);
        dispatch(updateOrder(newSortedTasks));
      }
      else {
        newSortedTasks = sortedTasks.map((task) => {
          if (sourceTask._id === task._id) {
            task.order = destination.index;
            task.listId = destination.droppableId;
          }
          else {
            if (task.order > source.index && task.listId === source.droppableId) {
              task.order -= 1;
            }
            if (task.order >= destination.index && task.listId !== source.droppableId) {
              task.order += 1;
            }
          }
          return task;
        });

        setSortedTasks(newSortedTasks);
        dispatch(updateOrder(newSortedTasks));
      }
    }
  };

  useEffect(() => {
    if (!isInvited) {
      dispatch(newCurrentTab(id));
    }
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
    if (lists) setSortedLists(lists.sort((a, b) => a.order - b.order));
    if (tasks) setSortedTasks(tasks.sort((a, b) => a.order - b.order));
  }, [tasks, lists]);

  useEffect(() => {
    if (Object.keys(currentTab).length)
    {
      if (currentTab.userID === userID && !isInvited)
      {
        dispatch(newSocketTab({ id, name }));
      }
      if (!isInvited && currentTab.userID !== userID)
      {
        history.push("/");
      }
    }
  }, [currentTab]);

  return (
    <SearchContext.Provider value={search}>
      <div data-tabid={id} className="workspace" style={{ backgroundImage: `url(../../../${currentTab && currentTab.imgPath})` }}>
        <Header />
        <div className="container">
          <div className="workspace-body">
            <BodyHeader currentTab={currentTab} currentSocket={currentSocket} userID={userID} isInvited={isInvited} />
            {
              !isInvited && <DragDropContext onDragEnd={onDragEnd}>
                <Droppable type="column" droppableId="all-columns" direction="horizontal">
                  {(provided) => (<div ref={provided.innerRef} {...provided.droppableProps} className="workspace-body-lists">
                    {
                      sortedLists && sortedLists.length > 0 && <List tasks={sortedTasks} currentTab={currentTab} lists={sortedLists} isInvited={isInvited} />
                    }
                    {provided.placeholder}
                  </div>
                  )}
                </Droppable>
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
