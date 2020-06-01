import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Draggable, Droppable } from 'react-beautiful-dnd';

// Context
import SearchContext from '../../List/searchContext';

import Tasks from '../Tasks';
import ListHeader from './listHeader';

export default () => {
  const search = useContext(SearchContext);
  const initialState = {
    sortedTasks: []
  };
  const [sortedTasks, setSortedTasks] = useState(initialState);
  const { fLists, fTasks } = useSelector((GlobalState) => GlobalState.sockets);
  const { tab } = useSelector((GlobalState) => GlobalState.sockets.currentSocket);

  useEffect(() => {
    if (!search.value) return setSortedTasks(fTasks);
    const sort = sortedTasks.filter((task) => task.title.includes(search.value));
    return setSortedTasks(sort);
  }, [search.value]);

  useEffect(() => {
    setSortedTasks(fTasks);
  }, [fTasks]);

  return (
    <div className="workspace-body-lists">
      {
        fLists.length > 0 && fLists.map((list) => {
          if (tab && tab._id === list.tabId) {
            return (
              <div key={list._id} data-order={list.order} className="list">
                <ListHeader list={list} />
                <div className="list-tasks">
                  {
                    fTasks.length > 0 && <Tasks tasks={sortedTasks} listId={list._id} />
                  }
                </div>
              </div>);
          }
        })
      }
    </div>
  );
};
