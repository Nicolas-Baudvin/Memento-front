import React, { useEffect, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

// Components
import ListHeader from './listHeader';
import TasksContainer from './TasksContainer';

// Actions
import { myTasks } from "../../../store/Tasks/actions";

// Styles
import './style.scss';

// Context
import SearchContext from './searchContext';

const List = ({ isInvited, tasks, lists, currentTab }) => {
  const search = useContext(SearchContext);
  const dispatch = useDispatch();
  const initialState = {
    sortedTasks: tasks,
  };
  const [state, setstate] = useState(initialState);

  useEffect(() => {
    if (!isInvited) {
      if (tasks.length === 0 || (lists.length > 0 && tasks[0].listId !== lists[0]._id)) {
        lists.forEach((list) => {
          dispatch(myTasks(list._id));
        });
      }
    }
  }, [lists]);

  useEffect(() => {
    if (tasks) setstate({ ...state, sortedTasks: tasks });
  }, [tasks]);

  useEffect(() => {
    if (!search.value) return setstate({ ...state, sortedTasks: tasks });
    const sort = state.sortedTasks.filter((task) => task.title.includes(search.value));
    return setstate({ sortedTasks: sort });
  }, [search.value]);

  return (
    lists.length > 0 && lists.sort((a, b) => a.order - b.order).map((list) => currentTab._id === list.tabId && (
      <Draggable key={list._id} draggableId={list._id} index={list.order}>
        {(provided) => (
          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} data-order={list.order} className="list">
            <ListHeader
              list={list}
            />
            <TasksContainer state={state} list={list} />
          </div>
        )}
      </Draggable>))
  );
};

List.propTypes = {
  isInvited: PropTypes.bool.isRequired,
  tasks: PropTypes.array.isRequired
};

export default List;
