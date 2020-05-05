import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Components
import Tasks from '../Tasks';
import ListHeader from './listHeader';
import TaskForm from './taskForm';

// Actions
import { myTasks, newTask } from "../../../store/Tasks/actions";

// Styles
import './style.scss';
import { updateList } from "../../../store/Lists/actions";

export default ({ isInvited, currentTab }) => {
  const { tasks } = useSelector((GlobalState) => GlobalState.mytasks);
  const { lists } = useSelector((GlobalState) => GlobalState.mylists);
  const dispatch = useDispatch();

  const handleUpdateListName = (list) => (e) => {
    e.preventDefault();
    const value = e.target.previousSibling.value;
    const input = e.target.parentNode;
    const settings = e.target.parentNode.previousSibling;
    const title = input.parentNode.firstChild;

    input.classList.remove("show");
    settings.classList.add("show");
    title.classList.add("show");
    // TODO: Mise à jour du titre
    dispatch(updateList({ newTitle: value, list }));
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

  return (
    <div className="workspace-body-lists">
      {
        lists && lists.length > 0 && lists.map((list) => {
          if (currentTab._id === list.tabId) return (
            <div key={list._id} data-order={list.order} className="list">
              <ListHeader
                showTitleInput={showTitleInput}
                handleUpdateListName={handleUpdateListName}
                list={list}
              />
              <div className="list-tasks">
                {
                  tasks.length > 0 && <Tasks tasks={tasks} listId={list._id} />
                }
                <TaskForm
                  addTaskToList={addTaskToList}
                  list={list}
                />
              </div>
            </div>);
        })
      }
    </div>
  );
};
