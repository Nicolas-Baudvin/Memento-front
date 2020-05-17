import React, { useEffect, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Components
import Tasks from '../Tasks';
import ListHeader from './listHeader';
import TaskForm from './taskForm';

// Actions
import { myTasks, newTask } from "../../../store/Tasks/actions";
import { updateList } from "../../../store/Lists/actions";

// Styles
import './style.scss';

// Context
import SearchContext from './searchContext';

export default ({ isInvited, currentTab }) => {
  const search = useContext(SearchContext);

  const { tasks } = useSelector((GlobalState) => GlobalState.mytasks);
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
    if (value) {
      dispatch(updateList({ newTitle: value, list }));
    }
  };

  const addTaskToList = (listId) => (e) => {
    e.preventDefault();
    const title = e.target.querySelector('textarea').value;
    dispatch(newTask({ listId, title }));
    e.target.querySelector('textarea').value = '';
  };

  const showTitleInput = (e) => {
    const title = e.target;
    title.classList.remove("show");
    title.parentNode.lastChild.classList.add("show");
    title.nextSibling.classList.remove("show");
  };

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
    if (tasks && !state.sortedTasks.length) setstate({ ...state, sortedTasks: tasks });
  }, [tasks]);

  useEffect(() => {
    console.log(search.value);

    if (!search.value) {
      return setstate({ ...state, sortedTasks: tasks });
    }

    const sort = state.sortedTasks.filter((task) => task.title.includes(search.value));
    setstate({ sortedTasks: sort });
  }, [search.value]);

  return (
    <div className="workspace-body-lists">
      {
        lists && lists.length > 0 && lists.map((list) => {
          if (currentTab._id === list.tabId) {
            return (
              <div key={list._id} data-order={list.order} className="list">
                <ListHeader
                  showTitleInput={showTitleInput}
                  handleUpdateListName={handleUpdateListName}
                  list={list}
                />
                <div className="list-tasks">
                  {
                  tasks && tasks.length > 0 && <Tasks tasks={state.sortedTasks} listId={list._id} />
                }
                  <TaskForm
                    addTaskToList={addTaskToList}
                    list={list}
                  />
                </div>
              </div>);
          }
        })
      }
    </div>
  );
};
