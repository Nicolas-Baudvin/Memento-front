import React from "react";
import { useSelector } from "react-redux";

import Tasks from '../Tasks';
import ListHeader from './listHeader';

export default () => {
  const { fLists, fTasks } = useSelector((GlobalState) => GlobalState.sockets);
  const { tab } = useSelector((GlobalState) => GlobalState.sockets.currentSocket);

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
                    fTasks.length > 0 && <Tasks tasks={fTasks} listId={list._id} />
                  }
                </div>
              </div>);
          }
        })
      }
    </div>
  );
};
