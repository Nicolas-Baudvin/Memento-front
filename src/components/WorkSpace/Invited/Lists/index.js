import React, { useContext, useEffect, useState } from "react";
import { Draggable } from 'react-beautiful-dnd';
import { useSelector } from "react-redux";

// Context
import SearchContext from '../../List/searchContext';

// Components
import ListHeader from './listHeader';
import TaskContainer from './TaskContainer';


export default ({ fLists, fTasks, tab }) => {
  const search = useContext(SearchContext);
  const { currentSocket } = useSelector((GlobalState) => GlobalState.sockets);
  const { username } = useSelector((GlobalState) => GlobalState.userData.datas);
  const [sortedTasks, setSortedTasks] = useState([]);
  const [isOp, setOp] = useState(false);

  useEffect(() => {
    if (!search.value) return setSortedTasks(fTasks);
    const sort = sortedTasks.filter((task) => task.title.includes(search.value));
    return setSortedTasks(sort);
  }, [search.value]);

  useEffect(() => {
    if (fTasks && fTasks.length) setSortedTasks(fTasks);

    if (Object.keys(currentSocket).length) {
      if (currentSocket.operators.filter((user) => user.userData.username === username).length > 0) {
        setOp(true);
      }
      else {
        setOp(false);
      }
    }
  }, [fTasks, currentSocket]);

  return (
    fLists.length > 0 && fLists.sort((a, b) => a.order - b.order).map((list) => tab && tab._id === list.tabId
      && <Draggable key={list._id} draggableId={list._id} index={list.order}>
        {
          (provided) => <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            data-order={list.order}
            className="list"
          >
            <ListHeader list={list} />
            <TaskContainer list={list} fTasks={fTasks} sortedTasks={sortedTasks} isOp={isOp} />
          </div>
        }
      </Draggable>)
  );
};
