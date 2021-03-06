import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';

// Components
import List from "../List";
import { reorderLists } from '../../../store/Lists/actions';
import { updateOrder } from '../../../store/Tasks/actions';

export default ({ isInvited, currentTab, isPublic }) => {
  const dispatch = useDispatch();
  const { tab } = useSelector((GlobalState) => GlobalState.sockets.currentSocket);
  const { lists } = useSelector((GlobalState) => GlobalState.mylists);
  const { tasks } = useSelector((GlobalState) => GlobalState.mytasks);
  const { fLists, fTasks } = useSelector((GlobalState) => GlobalState.sockets);
  const { currentSocket } = useSelector((GlobalState) => GlobalState.sockets);
  // Tab Owner
  const [sortedTasks, setSortedTasks] = useState([]);
  const [sortedLists, setSortedLists] = useState([]);
  // Guests
  const [sortedFriendTasks, setSortedFriendTasks] = useState([]);
  const [sortedFriendLists, setSortedFriendLists] = useState([]);

  const onDragEnd = (result) => {
    const {
      destination, source, draggableId, type
    } = result;

    const tasksToSort = isInvited ? sortedFriendTasks : sortedTasks;

    const sourceList = !isInvited
      ? lists.filter((x) => x._id === source.droppableId)[0]
      : fLists.filter((x) => x._id === source.droppableId)[0];

    const sourceTask = !isInvited
      ? sortedTasks.filter((x) => x._id === draggableId)[0]
      : fTasks.filter((x) => x._id === draggableId)[0];

    let newSortedTasks;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    if (type === "column") {
      const allLists = isInvited ? sortedFriendLists : sortedLists;
      const newListArray = allLists.map((item) => {
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

      if (newListArray.length) {
        if (isInvited) {
          setSortedFriendLists(newListArray);
        }
        else {
          setSortedLists(newListArray);
        }
        dispatch(reorderLists(newListArray));
      }
    }

    if (type === "task") {
      if (sourceList._id === destination.droppableId) {
        newSortedTasks = tasksToSort.map((item) => {
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

        if (isInvited) {
          setSortedFriendTasks(newSortedTasks);
        }
        else {
          setSortedTasks(newSortedTasks);
        }
        dispatch(updateOrder(newSortedTasks));
      }
      else {
        newSortedTasks = tasksToSort.map((task) => {
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

        if (isInvited) {
          setSortedFriendTasks(newSortedTasks);
        }
        else {
          setSortedTasks(newSortedTasks);
        }
        dispatch(updateOrder(newSortedTasks));
      }
    }
  };

  useEffect(() => {
    if (!isPublic) {
      // Owner
      if (!isInvited) {
        if (lists) setSortedLists(lists.sort((a, b) => a.order - b.order));
        if (tasks) setSortedTasks(tasks.sort((a, b) => a.order - b.order));
      }

      // Guests
      if (isInvited) {
        if (fTasks) setSortedFriendTasks(fTasks.sort((a, b) => a.order - b.order));
        if (fLists) setSortedFriendLists(fLists.sort((a, b) => a.order - b.order));
      }
    }
  }, [tasks, lists, fLists, fTasks]);

  useEffect(() => {
    if (isPublic && Object.keys(currentTab).length) {
      if (currentTab.lists && currentTab.tasks) {
        setSortedLists(currentTab.lists.sort((a, b) => a.order - b.order));
        setSortedTasks(currentTab.tasks.sort((a, b) => a.order - b.order));
      }
    }
  }, [currentTab]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {
        Object.keys(currentTab).length > 0 && <Droppable isDropDisabled={isPublic} type="column" droppableId="all-columns" direction="horizontal">
          {(provided) => (<div ref={provided.innerRef} {...provided.droppableProps} className="workspace-body-lists">
            {
              ((sortedLists && sortedLists.length > 0) || (sortedFriendLists && sortedFriendLists.length > 0))
              && <List
                isPublic={isPublic}
                tasks={sortedTasks.length ? sortedTasks : sortedFriendTasks}
                currentTab={currentTab}
                lists={sortedLists.length ? sortedLists : sortedFriendLists}
                isInvited={isInvited}
                tab={tab}
                currentSocket={currentSocket}
              />
            }
            {provided.placeholder}
          </div>
          )}
        </Droppable>
      }
    </DragDropContext>
  );
};
