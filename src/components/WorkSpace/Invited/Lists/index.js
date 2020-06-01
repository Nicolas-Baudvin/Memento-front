import React, { useContext, useEffect, useState } from "react";
import { Draggable, Droppable } from 'react-beautiful-dnd';

// Context
import SearchContext from '../../List/searchContext';

// Components
import ListHeader from './listHeader';
import TaskContainer from './TaskContainer';

export default ({ fLists, fTasks, tab }) => {
  const search = useContext(SearchContext);

  const [sortedTasks, setSortedTasks] = useState([]);

  useEffect(() => {
    if (!search.value) return setSortedTasks(fTasks);
    const sort = sortedTasks.filter((task) => task.title.includes(search.value));
    return setSortedTasks(sort);
  }, [search.value]);

  useEffect(() => {
    setSortedTasks(fTasks);
  }, [fTasks]);

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
            <TaskContainer list={list} fTasks={fTasks} sortedTasks={sortedTasks} />
          </div>
        }
      </Draggable>)
  );
};
