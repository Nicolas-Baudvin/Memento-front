import React, { useEffect, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Droppable, Draggable } from 'react-beautiful-dnd';


// Components
import ListHeader from './listHeader';
import TasksContainer from './TasksContainer';

// Actions
import { myTasks, newTask } from "../../../store/Tasks/actions";
import { updateList } from "../../../store/Lists/actions";

// Styles
import './style.scss';

// Context
import SearchContext from './searchContext';

export default ({ isInvited, currentTab, tasks }) => {
  const search = useContext(SearchContext);

  const { lists } = useSelector((GlobalState) => GlobalState.mylists);
  const dispatch = useDispatch();

  const initialState = {
    sortedTasks: tasks,
  };
  const [state, setstate] = useState(initialState);

  const handleUpdateListName = (list) => (e) => {
    e.preventDefault();
    const value = e.target.previousSibling.value;
    const input = e.target.parentNode;
    const settings = e.target.parentNode.previousSibling;
    const title = input.parentNode.firstChild;

    input.classList.remove("show");
    settings.classList.add("show");
    title.classList.add("show");
    if (value) dispatch(updateList({ newTitle: value, list }));
  };

  const addTaskToList = (listId, list) => (e) => {
    e.preventDefault();
    const title = e.target.querySelector('textarea').value;
    dispatch(newTask({ listId, title, name: list.name }));
    e.target.querySelector('textarea').value = '';
  };

  const showTitleInput = (e) => {
    const title = e.target;
    title.classList.remove("show");
    title.parentNode.lastChild.classList.add("show");
    title.nextSibling.classList.remove("show");
  };

  useEffect(() => {
    if (!isInvited)
    {
      if (tasks.length === 0 || (lists.length > 0 && tasks[0].listId !== lists[0]._id))
      {
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
    lists.sort((a, b) => a.order - b.order).map((list) => <Draggable key={list._id} draggableId={list._id} index={list.order}>
      {(provided) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} data-order={list.order} className="list">
          <ListHeader
            showTitleInput={showTitleInput}
            handleUpdateListName={handleUpdateListName}
            list={list}
          />
          <TasksContainer state={state} list={list} addTaskToList={addTaskToList} />
        </div>
      )}
    </Draggable>)
  );
};
